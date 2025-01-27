import { Pressable, StyleSheet, Text, View } from "react-native";
import { ITile } from "../interfaces";

interface Props{
  tileObj:ITile,
  onTilePress:(tileRow:number,tileCol:number)=>void;
}

const TileComp = (props:Props) => {
  const {row,col,isMine,mineCount}=props.tileObj;
  var {isDiscovered}=props.tileObj;

  return (
    <Pressable style={[styles.container,!isDiscovered&&styles.unknown]}
      onPress={()=>props.onTilePress(row,col)}>
      <Text style={styles.text}>{isDiscovered && (isMine ? "💣" : (mineCount==0? "" : mineCount))}</Text>
    </Pressable>
  )
}

const styles=StyleSheet.create({
  container:
  {
    width:35,
    height:35,
    borderWidth:1,
    borderColor:"darkgrey",
    alignItems:"center",
    justifyContent:"center",
  },
  unknown:
  {
    backgroundColor:"lightgrey"
  },
  text:
  {
    fontSize:18,
    fontWeight:800
  },
  mine:
  {
    backgroundColor:"red"
  }
});

export default TileComp;