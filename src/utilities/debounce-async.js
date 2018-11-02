export default (fn, millis = 0) => {
  const resolves = [];
  let timer;

  return async (...args) => {
    clearTimeout(timer);

    return new Promise(resolve => {
      resolves.push(resolve);

      timer = setTimeout(async () => {
        const result = await fn.apply(this, args);
        let i = resolves.length;

        while (i--) {
          const resolve = resolves.pop();

          i == 0 ? resolve(result || true) : resolve();
        }
      }, millis);
    });
  };
};
