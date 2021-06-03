import { expose } from 'comlink';
import { Simulation } from './utility/models/talktown';

const hello = (): string => {
  return 'Hello from worker';
}

const processTown = (town: Simulation) => {
  console.log(town);
};

const worker = {
  hello,
  processTown,
};

export type HelloWorker = typeof worker;

expose(worker);

// const ctx: Worker = self as any;

// console.log('Hello from worker');

// // Post data to parent thread
// ctx.postMessage({ foo: "foo" });

// // Respond to message from parent thread
// ctx.addEventListener("message", (event) => console.log(event));

// // const onmessage = function(e: any) {
// //   console.log('Message received from main script');
// //   const workerResult = 'Result: ' + (e.data[0] * e.data[1]);
// //   console.log('Posting message back to main script');
// //   postMessage(workerResult);
// // }

// export default onmessage
