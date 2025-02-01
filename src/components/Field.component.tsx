import { Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import { fieldReducer } from '../services/fieldReducer';
import { useReducer, useState } from 'react';
import TileComp from './Tile.component';
import { Field } from '../classes/Field';
import { ActionType, Flag, TileContent } from '../CustomTypes';
import { Action } from '../classes/Action';

const FIELD_WIDTH=7;
const FIELD_HEIGHT=10;
const MINE_COUNT=7;
const MUSHROOM_COUNT=7;
const COIN_COUNT=10;

const FieldComp = () => {
  const [fieldState,updateField]=useReducer(fieldReducer,new Field(FIELD_HEIGHT,FIELD_WIDTH,MINE_COUNT,MUSHROOM_COUNT,COIN_COUNT));
  const [menuVisible, setMenuVisible] = useState(false);
  const [flagMode,setFlagMode]=useState(false);
  const [selectedFlag, selectFlag]=useState(Flag.deadly);
  
  const handleTilePress=(tileRow:number,tileCol:number)=>
  {
    let tile=fieldState.matrix[tileRow][tileCol]
    if(!tile.isDiscovered && !fieldState.isGameOver)
    {
      if(flagMode)
        flagTile(tileRow,tileCol);
      else if(tile.flag===null)
        discoverTile(tileRow,tileCol);   
    }
    else if(tile.content==TileContent.coin)
      collectCoin(tileRow,tileCol);
  }

  const discoverTile=(tileRow:number,tileCol:number)=>{
      updateField(new Action(ActionType.discoverTile,tileRow,tileCol));
  }

  const flagTile=(tileRow:number,tileCol:number)=>{
    updateField(new Action(ActionType.flagTile,tileRow,tileCol,selectedFlag))
  }

  const collectCoin=(tileRow:number,tileCol:number)=>{
    updateField(new Action(ActionType.collectCoin,tileRow,tileCol))
  }

  const toggleFlagMode=(flag:Flag)=>
  {
    if(!fieldState.isGameOver)
    {
      if(flagMode&&flag!=selectedFlag)
        selectFlag(flag)
      else
      {
        setFlagMode(!flagMode);
        selectFlag(flag);
      }
    }
  }

  const toggleMenu=()=>
  {
    setMenuVisible(!menuVisible);
  }

  const resetGame=()=>
  {
    //updateField(new Field(fieldState.width,fieldState.height,fieldState.mineCount))
    updateField(new Action(ActionType.resetField));
    setMenuVisible(false);
  }
  const revealField=()=>
  {
    //updateField(new Field(fieldState.width,fieldState.height,fieldState.mineCount))
    updateField(new Action(ActionType.revealField));
    setMenuVisible(false);
  }

  return (
    
    <View style={styles.centeredView}>
      <View style={styles.row}>
        <Text style={styles.text}>👛🪙: {fieldState.coinsDiscovered}/{fieldState.coinCount}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>💀🍄: {fieldState.mushroomsDiscovered}/{fieldState.poisonResistence}</Text>
      </View>
      <View style={styles.field}>
        {fieldState.matrix.map((row, rowIndex)=>(
          <View key={rowIndex} style={styles.row}>
            {row.map((tile,tileIndex)=>(
              <TileComp
                key={tileIndex}
                tileObj={fieldState.matrix[rowIndex][tileIndex]}
                onTilePress={(tileRow,tileCol)=>{handleTilePress(tileRow,tileCol)}}
              ></TileComp>
            ))}
          </View>
        ))}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={menuVisible}
        onRequestClose={toggleMenu}
      >
        <View style={styles.centeredView}>
          <View style={[styles.modalView,styles.row]}>
            <Pressable onPress={toggleMenu}>
              <Text style={styles.button}>▶️</Text>
            </Pressable>
            <Pressable onPress={resetGame}>
              <Text style={styles.button}>🔄</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={fieldState.isGameOver}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>
              {fieldState.isGameWon ? "You won!" : "You lost!"}
            </Text>

            <View style={styles.row}>
              <Pressable onPress={resetGame}>
                <Text style={styles.button}>🔄</Text>
              </Pressable>

              <Pressable onPress={revealField}>
                <Text style={styles.button}>👁️</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.row}>
        <Pressable 
          style={(selectedFlag==Flag.deadly)&&flagMode&&styles.pressedButton}
          onPress={()=>{toggleFlagMode(Flag.deadly)}}>
          <Text style={styles.button}>🏴‍☠️</Text>
        </Pressable>
        <Pressable 
          style={(selectedFlag==Flag.mushroom)&&flagMode&&styles.pressedButton}
          onPress={()=>{toggleFlagMode(Flag.mushroom)}}>
          <Text style={styles.button}>🚩</Text>
        </Pressable>
      </View>

      <Pressable onPress={toggleMenu}>
        <Text style={styles.button}>⏸️</Text>
      </Pressable>
    </View>
  )
}



const styles=StyleSheet.create({
  centeredView:
  {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageElements:{gap:30},
  field:
  {
    borderWidth:1,
    borderStyle:"dotted",
  },
  row:{flexDirection:"row"},
  text:
  {
    fontSize:18,
    fontWeight:800,
  },
  button:{fontSize:30},
  pressedButton:
  {
    backgroundColor:"lightgrey",
    borderWidth:3,
    borderStyle:"solid",
    borderBottomColor:"white",
    borderRightColor:"white",
    borderTopColor:"grey",
    borderLeftColor:"grey",
  },
  modalView:
  {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default FieldComp;