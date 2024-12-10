import { IsOverflow } from "Word/tool/IsOverflow";
import { Multiset } from "algorithm/Multiset";

export const FillLack = (marking: [number, number, number, string], index: number, space: number[][], direction: Array<[number, number, number, string]>, distinct: Multiset<number[]>, maxLen: number) => {
    let col: number = marking[0], row: number = marking[1], length: number = marking[2];
    let dir: string = marking[3];

    let save = [dir === "up" || dir === "down" ? 1 : 0, dir === "left" || dir === "right" ? 1 : 0];
    
    for(let i=-1; i<=length+1; i+=length+2)
    {
        let colVec = col + i*save[0];
        let rowVec = row + i*save[1];

        if(!IsOverflow(colVec, rowVec, maxLen) && space[colVec][rowVec])
        {
            if(i === -1)
            {
                direction[index][0] = colVec;
                direction[index][1] = rowVec;
            }

            direction[index][2] += 1;

            distinct.add([space[colVec][rowVec], index + 1]);
        }
    }

    direction[index][2] += 1;
}