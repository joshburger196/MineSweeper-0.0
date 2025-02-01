import { Pressable, StyleSheet, Text, View } from "react-native";
import { Tile } from "../classes/Tile";
import { Flag, TileContent } from "../CustomTypes";

interface Props{
  tileObj:Tile,
  onTilePress:(tileRow:number,tileCol:number)=>void;
}

const TileComp = (props:Props) => {
  const {row,col,content,flag,mineCount,mushroomCount,isDiscovered}=props.tileObj;
  let contentString:string="";
  let flagString:string="";

  switch(content)
  {
    case TileContent.mine:
      contentString="💣";
      break;
    case TileContent.mushroom:
      contentString="🍄";
      break;
    case TileContent.coin:
      contentString="🪙";
      break;
    case TileContent.treasure:
      contentString="👑";
      break;
  }
  
  switch(flag)
  {
    case Flag.deadly:
      flagString="🏴‍☠️";
      break;
    case Flag.mushroom:
      flagString="🚩";
      break;
  }

  let tileLabelElement:React.JSX.Element=<></>;
  if(isDiscovered)
  {
    if(content==TileContent.nothing)
    {
      tileLabelElement=
        <View style={styles.row}>
          {mineCount>0 &&
            <Text style={[styles.text,styles.mineCount]}>
              {mineCount}
            </Text>}
          {mushroomCount>0 &&
            <Text style={[styles.text,styles.mushroomCount]}>
              {mushroomCount}
            </Text>}
        </View>;
    }
    else
      tileLabelElement=<Text style={styles.symbol}>{contentString}</Text>
  }
  else if(flag!=null)
    tileLabelElement=<Text style={styles.symbol}>{flagString}</Text>;

  return (
    <Pressable style={[styles.container,styles.row, isDiscovered ? styles.known : styles.unknown]}
      onPress={()=>props.onTilePress(row,col)}>
        {tileLabelElement}
    </Pressable>
  )
}

const styles=StyleSheet.create({
  container:
  {
    width:40,
    height:40,

    alignItems:"center",
    justifyContent:"center",
  },
  unknown:
  {
    backgroundColor:"lightgrey",
    borderWidth:3,
    borderStyle:"solid",
    borderBottomColor:"grey",
    borderRightColor:"grey",
    borderTopColor:"white",
    borderLeftColor:"white",
  },
  known:
  {
    borderWidth:1,
    borderColor:"black",
    borderStyle:"dotted",
  },
  row:
  {
    flexDirection:"row",
    gap:3
  },
  text:
  {
    fontSize:14,
    fontWeight:800,
  },
  symbol:
  {
    fontSize:18,
    fontWeight:800,
  },
  mineCount:{color:"black"},
  mushroomCount:{color:"red"}
});

export default TileComp;