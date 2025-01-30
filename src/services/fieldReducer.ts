import { Action } from "../classes/Action";
import { Field } from "../classes/Field";
import { Tile } from "../classes/Tile";
import { ActionType, TileContent} from "../CustomTypes";

export function fieldReducer(field:Field,act:Action):Field
{
    var newField:Field;
    var tile:Tile;
    switch(act.type)
    {
        case ActionType.discoverTile:
            newField=Field.copyField(field);
            newField.matrix[act.row][act.col].isDiscovered=true;
            if(newField.matrix[act.row][act.col].content==TileContent.mine)
                newField.isGameOver=true;
            else if(newField.matrix[act.row][act.col].content==TileContent.treasure)
                newField.isGameOver=newField.isGameWon=true;
            break;
        
        case ActionType.flagTile:
            newField=Field.copyField(field);
            tile=newField.matrix[act.row][act.col];
            if(tile.flag===null)
                tile.flag=act.flag;
            else
                tile.flag=null;
            break;

        case ActionType.collectCoin:
            newField=Field.copyField(field);
            tile=newField.matrix[act.row][act.col];
            if(tile.content===TileContent.coin)
            {
                tile.content=TileContent.nothing;
                newField.coinsDiscovered++;
                if(newField.coinsDiscovered==newField.coinCount)
                    newField.isGameOver=newField.isGameWon=true;
            }
            else
                tile.flag=null;
            break;
        
        case ActionType.resetField:
            newField=new Field(field.height,field.width,field.mineCount,field.coinCount);
            break;
        
        case ActionType.revealField:
            newField=Field.copyField(field);
            for(let iRow=0;iRow<field.height;iRow++)
                for(let iCol=0;iCol<field.width;iCol++)
                {
                    field.matrix[iRow][iCol].isDiscovered=true;
                }
            break;
        default:
            newField=field;
    }
    return newField;
}