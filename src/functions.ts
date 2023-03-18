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

const cloneBoard = (board: Mine[][]) => {
    return board.map((rows: Mine[]) => {
        return rows.map((field: Mine) => {
            return { ...field }
        })
    })
}

const getNeighbors = (board: Mine[][], row: number, column: number): Mine[] => {
    const neighbors: Mine[] = []
    const rows = [row - 1, row, row + 1]
    const columns = [column - 1, column, column + 1]

    rows.forEach((r: number) => {
        columns.forEach((c: number) => {
            const different = r !== row || c !== column
            const validRow = r >= 0 && r < board.length
            const validColumn = c >= 0 && c < board[0].length
            if (different && validRow && validColumn) {
                neighbors.push(board[r][c])
            }
        })
    })
    return neighbors
}

const safeNeighbors = (board: Mine[][], row: number, column: number) => {
    const safes = (result: boolean, neighbor: Mine) => result && !neighbor.mined
    return getNeighbors(board, row, column).reduce(safes, true)
}

const openField = (board: Mine[][], row: number, column: number) => {
    const field: Mine = board[row][column]
    if (!field.opened) {
        field.opened = true
        if (field.mined) {
            field.exploded = true
        } else if (safeNeighbors(board, row, column)) {
            getNeighbors(board, row, column)
                .forEach((n: Mine) => openField(board, n.row, n.column))
        } else {
            const neighbors = getNeighbors(board, row, column)
            field.nearMines = neighbors.filter((n: Mine) => n.mined).length
        }
    }
}

// let list: Mine[] = []

const fields = (board: any) => [].concat(...board)
const hadExplosion = (board: any) => fields(board)
    .filter((field: any) => field.exploded).length > 0
const pending = (field: any) => (field.mined && !field.flagged) || (!field.mined && !field.flagged)
const wonGame = (board: any) => fields(board).filter(pending).length === 0
const showMines = (board: any) => fields(board).filter((field: any) => field.mined)
    .forEach((field: any) => field.opened = true)

export {
    createdMinedBoard,
    cloneBoard,
    openField,
    hadExplosion,
    wonGame,
    showMines
}

export type Mine = {
    row: number
    column: number
    opened: boolean
    flagged: boolean
    mined: boolean
    exploded: boolean
    nearMines: number
}