export const hasCommonElement = (arr1: any, arr2: any) => {
  const [smallArray, largeArray] =
    arr1.length < arr2.length ? [arr1, arr2] : [arr2, arr1];
  const smallSet = new Set(smallArray);

  for (const item of largeArray) {
    if (smallSet.has(item)) {
      return true;
    }
  }
  return false;
};
