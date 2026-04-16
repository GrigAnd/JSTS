function myPromiseAll(promises) {

  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError('Argument must be an array'));
    }

    if (promises.length === 0) {
      return resolve([]);
    }

    let results = [];
    let completed = 0;

    promises.forEach((promise, i) => {
      Promise.resolve(promise)
        .then(value => {
          results[i] = value;
          completed++;

          if (completed === promises.length) {
            return resolve(results);
          }
        })
        .catch(err => {
          return reject(err);
        });
    });
  });
}

module.exports = myPromiseAll;