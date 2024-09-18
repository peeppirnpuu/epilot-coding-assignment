export const getRandomValueFromArray = (array: string[]) =>
  array[Math.floor(Math.random() * array.length)];

export const isNumber = (variable: any) =>
  !isNaN(variable) && variable !== null;
