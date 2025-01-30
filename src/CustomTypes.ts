interface ICoord
{
    row:number,
    col:number
}

enum ActionType
{
    discoverTile,
    flagTile,
    resetField,
    revealField
} 

enum Flag
{
    deadly
}

interface IAction
{
    actType:ActionType,
    actRow:number,
    actCol:number,
}

enum TileContent
{
    mine,
    mud,
    treasure,
    nothing
}

export {IAction,ActionType,ICoord,TileContent,Flag};