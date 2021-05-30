declare module "worker-loader!*" {
  // You need to change `Worker`, if you specified a different value for the `workerType` option
  class WebpackWorker extends Worker {
    constructor();
  }

  // Uncomment this if you set the `esModule` option to `false`
  // export = WebpackWorker;
  export default WebpackWorker;
}

// scss.d.ts
declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}
declare module "*.scss" {
  const content: { [className: string]: string };
  export default content;
}
