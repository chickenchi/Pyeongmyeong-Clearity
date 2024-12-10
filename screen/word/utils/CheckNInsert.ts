import { IsOverlap } from "Word/tool/IsOverlap";
import { Multiset } from "algorithm/Multiset";

export const CheckNInsert = (distinct: Multiset<number[]>, direction: Array<[number, number, number, string]>, space: number[][], cnt: number, maxLen: number) => {
    let dirUD: number = Math.floor(Math.random() * 2);    
    let col: number = Math.floor(Math.random() * (maxLen - 1));
    let row: number = Math.floor(Math.random() * (maxLen - 1));
    
    let btS: number = maxLen - col - 1; // bottom space
    let topS: number = col; // top space
    let rsS: number = maxLen - row - 1; // right side space
    let lsS: number = row; // left side space
      
    let dir: string = !dirUD ?
                (!btS ? "up" : "down")
                : (!rsS ? "left" : "right");

    let wMaxLen: number;

    if(!dirUD)
        wMaxLen = (dir === "up" ? topS : btS);
    else
        wMaxLen = (dir === "left" ? lsS : rsS);

    let save = [!dirUD ? 1 : 0, dirUD ? 1 : 0];

    let length: number = Math.floor(Math.random() * wMaxLen) + 1;

    if(length > 4)
        if(Math.floor(Math.random() * 10) + 1 != 0)
            length = Math.floor(Math.random() * 4) + 1;

    for(let i=0; i<=length; i++)
    {
        let colVec = col + i*save[0];
        let rowVec = row + i*save[1];

        if(IsOverlap(colVec, rowVec, 1, space, save, maxLen)) return false;
    }

    for(let i=0; i<=length; i++)
    {
        let colVec = col + i*save[0];
        let rowVec = row + i*save[1];

        if(space[colVec][rowVec])
        {
            distinct.add([space[colVec][rowVec], cnt]);
        }
        else
            space[colVec][rowVec] = cnt;
        
        IsOverlap(colVec, rowVec, 0, space, save, maxLen);
    } 

    direction.push([col, row, length, dir]);

    return true
}