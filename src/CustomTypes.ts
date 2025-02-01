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
    deadly,
    mushroom
}

enum TileContent
{
    mine,
    mushroom,
    coin,
    treasure,
    nothing
}

export {ActionType,ICoord,TileContent,Flag};