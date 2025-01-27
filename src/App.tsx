import { StatusBar } from 'expo-status-bar';
import { Button, Pressable, StyleSheet, Text, View } from 'react-native';
import TileComp from './components/Tile.component';
import FieldComp from './components/Field.component';

export default function App() {
  
  return (
    <View style={styles.container}>
      <FieldComp></FieldComp>
    </View>
  );
}



const styles = StyleSheet.create({
  container:
  {
    flex: 1,
    gap:30,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
