import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


import params from './src/params';
import MineField from './src/components/MineField';
import { Mine, createdMinedBoard } from './src/functions';

function App(): JSX.Element {


  const minesAmount = (): number => {
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()
    return Math.ceil(cols * rows * params.dificultLevel)
  }


  const createState = (): Mine[][] => {
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()
    return createdMinedBoard(rows, cols, minesAmount())
  }

  return (
    <View style={styles.container}>
      <Text>
        Tamanho da grade:
        {params.getRowsAmount()}x{params.getColumnsAmount()}
      </Text>
      <View style={styles.board}>
        <MineField board={createState()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end'
  },

  board: {
    alignItems: 'center',
    backgroundColor: '#AAA'
  }

});

export default App;
