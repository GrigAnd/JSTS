Function.prototype.myCall = function (ctx, ...args) {
  ctx = ctx || globalThis;

  const funSymbol = Symbol('fun');

  ctx[funSymbol] = this;

  const res = ctx[funSymbol](...args);
  delete ctx[funSymbol];
  return res;
}

Function.prototype.myApply = function (ctx, args) {
  return this.myCall(ctx, ...args || []);
}

Function.prototype.myBind = function (ctx, ...args) {
  return (...newArgs) => {
    return this.myCall(ctx, ...args, ...newArgs);
  };
}