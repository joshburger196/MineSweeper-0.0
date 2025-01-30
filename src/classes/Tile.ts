import { Flag, TileContent } from "../CustomTypes";

export class Tile
{
    row:number;
    col:number;
    content:TileContent;
    flag:Flag|null=null;
    isDiscovered:boolean;
    mineCount:number;
    //mudCount:number;

    constructor(row:number,col:number)
    {
        this.row=row;
        this.col=col;
        this.content=TileContent.nothing;
        this.isDiscovered=false;
        this.mineCount=0;
        //this.mudCount=0;
    }

}