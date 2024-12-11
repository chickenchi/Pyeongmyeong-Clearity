export const findKeyByValue = (value: number, myMap: Map<string, number>) => {
  for (const [key, val] of myMap) {
    console.log([val, value]);

    if (val === value) {
      return key; // value가 일치하는 key를 반환
    }
  }
  return undefined; // value가 없으면 undefined 반환
};
