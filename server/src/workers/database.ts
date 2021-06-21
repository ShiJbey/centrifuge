import { expose } from 'threads/worker';
import { SimulationDatabase } from '../database';

const dbs: { [key: string]: SimulationDatabase } = {};
let threadId = '-1';
const maxDbInstances = 1;

const databaseAPI = {
  setID(id: string): void {
    threadId = id;
  },
  loadSimulationData(sliceId: string, data: string): void {
    const simDb = new SimulationDatabase();
    const sim = JSON.parse(data);
    try {
      simDb.loadTalkOfTheTown(sim);
      dbs[sliceId] = simDb;
    } catch (error) {
      console.error(threadId, `slice-${sliceId}`, error);
    }
  },
  query(
    queryStr: string,
    rules?: string
  ): { sliceId: number; results: any[] }[] {
    const response: { sliceId: number; results: any[] }[] = [];
    for (const sliceId of Object.keys(dbs)) {
      response.push({
        sliceId: parseInt(sliceId),
        results: dbs[sliceId].query(queryStr, rules),
      });
    }
    return response;
  },
  isFull(): boolean {
    return Object.keys(dbs).length >= maxDbInstances;
  },
};

export type DatabaseWorker = typeof databaseAPI;

expose(databaseAPI);
