interface ICoord
{
    row:number,
    col:number
}

enum ActionType
{
    discoverTile,
    flagTile,
    collectCoin,
    resetField,
    revealField
} 

enum Flag
{
    deadly
}

enum TileContent
{
    mine,
    mud,
    coin,
    treasure,
    nothing
}

export {ActionType,ICoord,TileContent,Flag};