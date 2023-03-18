import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';


import params from './src/params';
import MineField from './src/components/MineField';
import {
  Mine,
  createdMinedBoard,
  cloneBoard,
  openField,
  hadExplosion,
  wonGame,
  showMines
} from './src/functions';

function App(): JSX.Element {


  const minesAmount = (): number => {
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()
    return Math.ceil(cols * rows * params.dificultLevel)
  }


  const createState = () => {
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()
    return {
      board: createdMinedBoard(rows, cols, minesAmount()),
      won: false,
      lost: false
    }
  }

  const onOpenField = (row: number, column: number): void => {
    const board = cloneBoard(createState().board)
    openField(board, row, column)
    const lost = hadExplosion(board)
    const won = wonGame(board)

    if (lost) {
      showMines(board)
      Alert.alert('Perdeuuu!', 'Que burrooo!')
    }

    if (won) {
      Alert.alert('Parabéns', 'Você venceu')
    }

    createState().board = board
    createState().won = won
    createState().lost = lost


  }

  return (
    <View style={styles.container}>
      <Text>
        Tamanho da grade:
        {params.getRowsAmount()}x{params.getColumnsAmount()}
      </Text>
      <View style={styles.board}>
        <MineField board={createState().board} OnOpenField={onOpenField} />
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
