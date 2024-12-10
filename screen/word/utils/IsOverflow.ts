export const IsOverflow = (val1: number, val2: number, maxValue: number) => {
    return val1 < 0 || val1 >= maxValue || val2 < 0 || val2 >= maxValue;
};