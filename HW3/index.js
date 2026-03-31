Array.prototype.myReduce = function (cb, ...args) { // чтобы вызывать прямо на массиве
  if (typeof cb !== 'function') { throw new TypeError(cb + " is not a function"); }

  let arr = this;
  let len = arr.length;
  let ind = 0;
  let accum;

  if (args.length > 0) { // если initialValue передано, даже undefined
    accum = args[0];
  } else {
    if (len === 0) { throw new TypeError("Empty array + no initial value"); }
    
    while (!(ind in arr)) { // пропускаем пустые элементы
      ind++;
    }
    accum = arr[ind];
    ind++;
  }

  for (; ind < len; ind++) {
    if (ind in arr) { // пропускаем пустые элементы
      accum = cb(accum, arr[ind], ind, arr);
    }
  }

  return accum;
};