/* eslint-disable @typescript-eslint/no-explicit-any */
const ctx: Worker = self as any;

ctx.onmessage = (e: MessageEvent) => {
  const { type } = e.data;

  if (type === 'START') {
    if ((ctx as any).timerInterval) clearInterval((ctx as any).timerInterval);

    (ctx as any).timerInterval = setInterval(() => {
      ctx.postMessage({ type: 'TICK' });
    }, 1000);
  } else if (type === 'STOP') {
    if ((ctx as any).timerInterval) {
      clearInterval((ctx as any).timerInterval);
      (ctx as any).timerInterval = null;
    }
  }
};
