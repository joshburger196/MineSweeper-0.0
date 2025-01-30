import {ICoord, TileContent} from "../CustomTypes";
import { Tile } from "./Tile";

export class Field{
    //Set up properties
    width:number;
    height:number;
    mineCount:number;
    //mudCount:number;
    treasureCount:number=1;

    //running properties
    turnCount:number=0;
    isGameOver:boolean=false;
    isGameWon:boolean=false;

    matrix:Tile[][];

    static copyField(field:Field)
    {
        var newField= new Field(field.width,field.height,field.mineCount,false);
        newField.matrix=field.matrix.slice();
        return newField;
    }

    constructor(height:number,width:number,mineCount:number,populate:boolean=true)
    {
        this.width=width;
        this.height=height;
        this.mineCount=mineCount;
        //this.mudCount=mudCount;
        this.matrix=[];
        var row:Tile[];
        for(var iRow=0; iRow<height; iRow++)
        {
            row=[];
            for(var iCol=0; iCol<width; iCol++)
                row.push(new Tile(iRow,iCol));
            this.matrix.push(row);
        }

        if(populate)
        {
            //Insert random mines, except on the first cell
            let minesToInsert=this.mineCount;
            while(minesToInsert>0)
            {
                let row=Math.floor(Math.random()*this.height);
                let col=Math.floor(Math.random()*this.width);
                if(row==0 && col==0)
                    continue;
                else if(this.matrix[row][col].content==TileContent.nothing)
                {
                    this.matrix[row][col].content=TileContent.mine;
                    minesToInsert--;
                    this.incrementAdjMineCounts(row,col);
                }
            }

            //Insert random mud tiles, except on the first cell
            /*let mudToInsert=this.mudCount;
            while(mudToInsert>0)
            {
                let row=Math.floor(Math.random()*this.height);
                let col=Math.floor(Math.random()*this.width);
                if(row==0 && col==0)
                    continue;
                if(this.matrix[row][col].content==TileContent.nothing)
                {
                    this.matrix[row][col].content=TileContent.mud;
                    mudToInsert--;
                    this.incrementAdjMineCounts(row,col);
                }
            }*/

            //Insert 1 treasure
            let treasureToInsert=this.treasureCount;
            while(treasureToInsert>0)
            {
                let row=Math.floor(Math.random()*this.height);
                let col=Math.floor(Math.random()*this.width);
                if(row==0 && col==0)
                    continue;
                else if(this.matrix[row][col].content==TileContent.nothing)
                {
                    this.matrix[row][col].content=TileContent.treasure;
                    treasureToInsert--;
                }
            }
        }
    }

    incrementAdjMineCounts(row:number,col:number)
    {
        const neighCoords=this.getNeighbourCoords(row,col)

        neighCoords.forEach((neigh)=>{this.matrix[neigh.row][neigh.col].mineCount++})
    }

    getNeighbourCoords(row:number,col:number):ICoord[]
    {
        var neighbours:ICoord[]=[];

        //these constants will help me to optimise IN THE FUTURE
        const isOnRightEdge=col==this.width-1;
        const isOnLeftEdge=col==0;
        const isOnTopEdge=row==0;
        const isOnBottomEdge=row==this.height-1;
        

        if(row>0 && col>0) neighbours.push({row:row-1,col:col-1});//top left
        if(row>0) neighbours.push({row:row-1,col:col});//top
        if(row>0 && col<this.width-1) neighbours.push({row:row-1,col:col+1});//top right
        if(col>0) neighbours.push({row:row,col:col-1});//left
        if(col<this.width-1) neighbours.push({row:row,col:col+1});//right
        if(row<this.height-1 && col>0) neighbours.push({row:row+1,col:col-1});//bottom left
        if(row<this.height-1) neighbours.push({row:row+1,col:col});//Bottom
        if(row<this.height-1 && col<this.width-1) neighbours.push({row:row+1,col:col+1});//bottom right

        return neighbours;
    }
}

