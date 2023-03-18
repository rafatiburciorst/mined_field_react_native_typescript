const createBoard = (rows: number, columns: number) => {
    return Array(rows).fill(0).map((_: any, row: number) => {
        return Array(columns).fill(0).map((_: any, column: number) => {
            return {
                row,
                column,
                opened: false,
                flagged: false,
                mined: false,
                exploded: false,
                nearMines: 0
            }
        })
    })
}


const spreadMines = (board: Mine[][], minesAmount: number): void => {
    const rows = board.length
    const columns = board[0].length
    let minesPlanted: number = 0

    while (minesPlanted < minesAmount) {
        const rowSelected = Math.floor(Math.random() * rows)
        const ColumnSelected = Math.floor(Math.random() * columns)

        if (board[rowSelected][ColumnSelected].mined == false) {
            board[rowSelected][ColumnSelected].mined = true
            minesPlanted++
        }
    }
}


const createdMinedBoard = (rows: number, columns: number, minesAmount: number) => {
    const board = createBoard(rows, columns)
    spreadMines(board, minesAmount)
    return board
}

export { createdMinedBoard }

export type Mine = {
    row: number
    column: number
    opened: boolean
    flagged: boolean
    mined: boolean
    exploded: boolean
    nearMines: number
}