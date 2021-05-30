// import { expose } from 'comlink';

// const hello = (): string => {
//   return 'Hello from worker';
// }

// const worker = {
//   hello
// };

// export type HelloWorker = typeof worker;

// expose(worker);

const ctx: Worker = self as any;

console.log('Hello from worker');

// Post data to parent thread
ctx.postMessage({ foo: "foo" });

// Respond to message from parent thread
ctx.addEventListener("message", (event) => console.log(event));

// const onmessage = function(e: any) {
//   console.log('Message received from main script');
//   const workerResult = 'Result: ' + (e.data[0] * e.data[1]);
//   console.log('Posting message back to main script');
//   postMessage(workerResult);
// }

export default onmessage
