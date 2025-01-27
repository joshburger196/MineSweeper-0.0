import {ICoord, ITile} from "../interfaces";
import { createTile } from "../services/createTile";

export class Field{
    width:number;
    height:number;
    mineCount:number;
    matrix:ITile[][];

    static copyField(field:Field)
    {
        var newField= new Field(field.width,field.height,field.mineCount,false);
        newField.matrix=field.matrix.slice();
        return newField;
    }

    constructor(width:number,height:number,mineCount:number,populate:boolean=true)
    {
        this.width=width;
        this.height=height;
        this.mineCount=mineCount;
        this.matrix=[];
        var row:ITile[];
        for(var iRow=0; iRow<height; iRow++)
        {
            row=[];
            for(var iCol=0; iCol<width; iCol++)
                row.push(createTile(iRow,iCol));
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
                if(this.matrix[row][col].isMine)
                    continue;
                else
                {
                    this.matrix[row][col].isMine=true;
                    minesToInsert--;
                    this.incrementAdjMineCounts(row,col);
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

