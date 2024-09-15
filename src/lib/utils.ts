export const randomInt = (max: number, min: number = 1) => {
  if (!Number.isInteger(max) || !Number.isInteger(min)) {
    throw new Error('Max and min must be integers.');
  }

  if (min > max) {
    throw new Error('Max must be no less than min.');
  }

  return Math.floor(Math.random() * (max - min + 1) + min);
};
