import { IsOverflow } from "Word/tool/IsOverflow";

export const IsValid = (axis: any, c: number, r: number, space: number[][], maxLen: number) => {
    const col1 = axis ? c + 1 : c;
    const col2 = axis ? c - 1 : c;
    const row1 = !axis ? r + 1 : r;
    const row2 = !axis ? r - 1 : r;
  
    if (IsOverflow(col1, row1, maxLen) || IsOverflow(col2, row2, maxLen)) return false;
  
    return !(space[col1][row1] || space[col2][row2]);
};