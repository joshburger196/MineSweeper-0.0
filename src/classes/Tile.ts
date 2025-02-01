import { Flag, TileContent } from "../CustomTypes";

export class Tile
{
    row:number;
    col:number;
    content:TileContent=TileContent.nothing;
    flag:Flag|null=null;
    isDiscovered:boolean=false;
    mineCount:number=0;
    mushroomCount:number=0;

    constructor(row:number,col:number)
    {
        this.row=row;
        this.col=col;
    }

}