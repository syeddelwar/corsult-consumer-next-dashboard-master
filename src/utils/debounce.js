// eslint-disable-next-line import/no-anonymous-default-export
export default function (func) {
  let timer;
  return function (...args) {
    const context = this;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      func.apply(context, args);
    }, 700);
  };
}
