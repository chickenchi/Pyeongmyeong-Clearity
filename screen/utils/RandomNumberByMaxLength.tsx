export const RandomNumberByMaxLength = (maxlength: number) => {
  let randNum = Math.floor(Math.random() * maxlength) + 1;

  return randNum;
};
