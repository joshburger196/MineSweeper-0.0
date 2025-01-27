import { Pressable, StyleSheet, Text, View } from 'react-native'
import { fieldReducer } from '../services/fieldReducer';
import { useReducer } from 'react';
import TileComp from './Tile.component';
import { Field } from '../classes/Field';
import { ActionType } from '../interfaces';

const FIELD_SIZE=10;
const MINE_COUNT=20;

const FieldComp = () => {
  const [fieldState,updateField]=useReducer(fieldReducer,new Field(FIELD_SIZE,FIELD_SIZE,MINE_COUNT));
  
  const discoverTile=(tileRow:number,tileCol:number)=>
  {
    updateField({actType:ActionType.discoverCell,actRow:tileRow,actCol:tileCol})
  }

  const resetGame=()=>
  {
    updateField({actType:ActionType.resetField,actRow:0,actCol:0});
  }

  return (
    <View style={styles.container}>
      <View>
        {fieldState.matrix.map((row, rowIndex)=>(
          <View key={rowIndex} style={styles.row}>
            {row.map((tile,tileIndex)=>(
              <TileComp
                key={tileIndex}
                tileObj={fieldState.matrix[rowIndex][tileIndex]}
                onTilePress={(tileRow,tileCol)=>{discoverTile(tileRow,tileCol)}}
              ></TileComp>
            ))}
          </View>
        ))}
      </View>
      <Pressable onPress={resetGame}>
        <Text style={styles.resetButton}>🔄</Text>
      </Pressable>
    </View>
  )
}



const styles=StyleSheet.create({
  container:
  {
    flex: 1,
    gap:30,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row:
  {
    flexDirection:"row"
  },
  resetButton:
  {
    fontSize:30,
  }
});

export default FieldComp;