import fs from 'fs';
import glob from 'glob';
import express, { Application } from 'express';
import { spawn, Thread, Worker, ModuleThread } from 'threads';
import { DatabaseWorker } from './workers/database';
import { allRules } from './database';
import path from 'path';
import ProgressBar from 'progress';

const SERVER_PORT = 8080;
let databaseWorkers: ModuleThread<DatabaseWorker>[] = [];

interface ServerResponse {
  status: 'ok' | 'error';
  results?: { sliceId: number, results: any[]}[];
  message?: string;
}

function configureRoutes(app: Application): void {
  app.post('/', async (req, res) => {
    if (req.body && req.body.op === 'query') {
      try {
        const ret: ServerResponse = {
          status: 'ok',
          results: await queryDatabases(req.body.query, allRules),
        };
        res.json(ret);
      } catch (error) {
        res.json({
          status: 'error',
          message: error.toString(),
        } as ServerResponse);
      }
    } else {
      res.json({
        status: 'error',
        message: 'unrecognized operation',
      } as ServerResponse);
    }
  });
}

async function queryDatabases(
  queryStr: string,
  rules?: string
): Promise<{ sliceId: number, results:any[] }[]> {
  const data: { sliceId: number, results:any[] }[] = [];
  for (const worker of databaseWorkers) {
    const results = await worker.query(queryStr, rules);
    data.push(...results);
  }
  data.sort((a, b) => a.sliceId - b.sliceId);
  return data;
}

function terminateWorkers() {
  const terminatePromises: Promise<any>[] = [];
  for (const worker of databaseWorkers) {
    terminatePromises.push(Thread.terminate(worker));
  }
  return Promise.all(terminatePromises);
}

function clearWorkers() {
  databaseWorkers = [];
}

function getSimulationFileNames(directoryPath: string, seed: string) {
  return glob.sync(`${directoryPath}/${seed}_*.town.json`);
}

function getSliceNumber(filename: string, extension = '.town.json'): number {
  const basename = path.basename(filename, extension);
  return parseInt(basename.split('_')[1]);
}

(async function main() {
  const [,, dataDirectory = '../talktown-timeslices/data/100_2/', seed = 'seed00'] = process.argv;
  console.log(`Loading town data with seed '${seed}' from ${dataDirectory}`)
  const dataFileNames = getSimulationFileNames(dataDirectory, seed);

  dataFileNames.sort((a, b) => getSliceNumber(a) - getSliceNumber(b));

  console.log(`Creating ${dataFileNames.length} database instances`);
  const bar = new ProgressBar(':bar', { total: dataFileNames.length});
  const loadDataPromises: Promise<any>[] = [];
  let currentWorker: ModuleThread<DatabaseWorker> | undefined;

  for (const fileName of dataFileNames) {
    try {
      const simData = fs.readFileSync(fileName, { encoding: 'utf-8' });

      if (currentWorker === undefined) {
        currentWorker = await spawn<DatabaseWorker>(
          new Worker('./workers/database')
        );
      } else if (await currentWorker.isFull()) {
        currentWorker = await spawn<DatabaseWorker>(
          new Worker('./workers/database')
        );
      }

      await currentWorker.setID(`thread_${databaseWorkers.length}`);
      databaseWorkers.push(currentWorker);
      loadDataPromises.push(
        currentWorker.loadSimulationData(getSliceNumber(fileName).toString(), simData)
        .then(() => {
          bar.tick();
        }));
    } catch (error) {
      console.error(error);
    }
  }

  try {
    await Promise.all(loadDataPromises);
    console.log('All simulation data loaded');
  } catch (error) {
    console.error(error);
    await terminateWorkers();
    clearWorkers();
    process.exit(1);
  }

  const app = express();
  app.use(express.json());
  configureRoutes(app);
  app.listen(SERVER_PORT, () => {
    console.log(`Database listening at http://localhost:${SERVER_PORT}`);
  });

  process.on('SIGTERM', async () => {
    console.log('Shutting down server.');
    await terminateWorkers();
    clearWorkers();
  });

  process.on('SIGINT', async () => {
    console.log('Shutting down server.');
    await terminateWorkers();
    clearWorkers();
  });
})();
