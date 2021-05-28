import { expose } from 'comlink';

const hello = (): string => {
  return 'Hello from worker';
}

const worker = {
  hello
};

export type HelloWorker = typeof worker;

expose(worker);
