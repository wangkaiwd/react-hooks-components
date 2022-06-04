export const requestCreator = (value: any, reason: any, delay: number) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (value) {
        resolve(value);
      } else {
        reject(reason);
      }
    }, delay);
  });
};
