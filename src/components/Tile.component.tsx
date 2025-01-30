import { Pressable, StyleSheet, Text } from "react-native";
import { Tile } from "../classes/Tile";
import { Flag, TileContent } from "../CustomTypes";

interface Props{
  tileObj:Tile,
  onTilePress:(tileRow:number,tileCol:number)=>void;
}

const TileComp = (props:Props) => {
  const {row,col,content,flag,mineCount}=props.tileObj;
  const {isDiscovered}=props.tileObj;
  let contentString:string="";
  let flagString:string="";

  switch(content)
  {
    case TileContent.mine:
      contentString="💣";
      break;
    /*case TileContent.mud:
      contentString="🟫";
      break;*/
    case TileContent.treasure:
      contentString="👑";
      break;
    case TileContent.nothing:
      if(mineCount>0)
        contentString=mineCount.toString();
  }
  
  switch(flag)
  {
    case Flag.deadly:
      flagString="🏴‍☠️";
      break;
  }

  return (
    <Pressable style={[styles.container, isDiscovered ? styles.known : styles.unknown]}
      onPress={()=>props.onTilePress(row,col)}>
      <Text style={[styles.text,styles.mineCount]}>
        {isDiscovered ? contentString : flagString}
      </Text>
    </Pressable>
  )
}

const styles=StyleSheet.create({
  container:
  {
    width:35,
    height:35,

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
  mine:
  {
    backgroundColor:"red"
  },
  mud:
  {
    backgroundColor:"brown"
  },
  text:
  {
    fontSize:18,
    fontWeight:800,
  },
  mineCount:
  {
    color:"black"
  },
  mudCount:
  {
    color:"brown"
  }
});

export default TileComp;