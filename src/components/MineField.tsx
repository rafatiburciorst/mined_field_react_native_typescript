import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Mine } from '../functions'
import Field from './field'

type Props = {
    board: Mine[][]
}

const MineField = (props: Props) => {
    const rows = props.board.map((row: Mine[], r: number) => {
        const columns = row.map((field: Mine, c: number) => {
            return <Field {...field} key={c} />
        })
        return <View style={{ flexDirection: 'row' }} key={r}>
            {columns}
        </View>
    })
    return <View style={styles.container}>
        {rows}
    </View>
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#eee'
    }
})

export default MineField