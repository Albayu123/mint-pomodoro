import '@testing-library/jest-dom';

// Mock Web Worker globally for all tests
/* eslint-disable @typescript-eslint/no-explicit-any */
class WorkerMock {
  onmessage: ((this: Worker, ev: MessageEvent) => any) | null = null;
  postMessage(_message: any) {}
  terminate() {}
  addEventListener() {}
  removeEventListener() {}
  dispatchEvent() {
    return true;
  }
}
globalThis.Worker = WorkerMock as any;
/* eslint-enable @typescript-eslint/no-explicit-any */

// gunakan globalThis
globalThis.URL.createObjectURL = () => '';
globalThis.URL.revokeObjectURL = () => {};
