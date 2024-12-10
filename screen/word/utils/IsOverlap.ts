import { IsOverflow } from "Word/tool/IsOverflow";
import { IsValid } from "Word/tool/IsValid";

let xDir = [0, 0, -1, 1];
let yDir = [1, -1, 0, 0];

export const IsOverlap = (colVec: number, rowVec: number, no: number, space: number[][], save: number[], maxValue: number) => {
    for(let i=0; i<4; i++)
    {
        let c = colVec+yDir[i];
        let r = rowVec+xDir[i];
        
        if(IsOverflow(c, r, maxValue) || !space[c][r]) continue;
        
        if(no === 1)
            if(!IsValid(save[0], c, r, space, maxValue)) return true;
    }

    return false;
}