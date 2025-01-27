import {ITile} from "../interfaces";

export function createTile(row:number,col:number):ITile
{
    return {row,col,isMine:false,isDiscovered:false,mineCount:0}
}