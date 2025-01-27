import { Field } from "./classes/Field";

interface ITile
{
    row:number,
    col:number,
    isMine:boolean,
    isDiscovered:boolean,
    mineCount:number,
}

interface ICoord
{
    row:number,
    col:number
}

enum ActionType
{
    discoverCell,
    markCell,
    resetField
}

interface IAction
{
    actType:ActionType,
    actRow:number,
    actCol:number
}

export {ITile,IAction,ActionType,ICoord};