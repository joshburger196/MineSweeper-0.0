import { ActionType, Flag } from "../CustomTypes"

export class Action
{
    type:ActionType;
    row:number;
    col:number;
    flag:Flag=Flag.deadly;
    constructor(type:ActionType,row:number = 0,col:number=0,flag:Flag=Flag.deadly)
    {
        this.type=type;
        this.row=row;
        this.col=col;
        this.flag=flag;
    }
}