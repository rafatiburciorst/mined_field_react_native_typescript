import React from "react";
import { StyleSheet, Text, View } from 'react-native'

import params from "../params";
import Flag from "./Flag";
import Mine from "./Mine";

type Props = {
    mined?: boolean
    opened?: boolean
    nearMines?: number
    exploded?: boolean
    flagged?: boolean
}

export default (props: Props): JSX.Element => {
    let { mined, opened, nearMines, exploded, flagged } = props

    let styleField: any[] = []
    styleField = [styles.field]
    if (opened) styleField.push(styles.opened)
    if (exploded) styleField.push(styles.exploded)
    if (flagged) styleField.push(styles.flagged)
    if (!opened && !exploded) styleField.push(styles.regular)

    let color: any = null
    if (nearMines && nearMines > 0) {
        if (nearMines == 1) color = '#2A28D7'
        if (nearMines == 2) color = '#28520F'
        if (nearMines > 2 && nearMines < 6) color = '#F9060A'
        if (nearMines >= 6) color = '#F221A9'
    }

    if (!nearMines) {
        nearMines = 0
    }

    return (
        <View style={styleField}>
            {!mined && opened && nearMines > 0 ?
                <Text style={[styles.label, { color: color }]}>
                    {nearMines}
                </Text> : false}
            {mined && opened ? <Mine /> : false}
            {flagged && !opened ? <Flag /> : false}
        </View>
    )
}

const styles = StyleSheet.create({
    field: {
        height: params.blockSize,
        width: params.blockSize,
        borderWidth: params.borderSize
    },
    regular: {
        backgroundColor: '#999',
        borderLeftColor: '#CCC',
        borderTopColor: '#CCC',
        borderRightColor: '#333',
        borderBottomColor: '#333'
    },
    opened: {
        backgroundColor: '#999',
        borderColor: '#777',
        alignItems: 'center',
        justifyContent: 'center'
    },
    label: {
        fontWeight: 'bold',
        fontSize: params.fontSize
    },
    exploded: {
        backgroundColor: 'red',
        borderColor: 'red'
    },
    flagged: {

    }
})

