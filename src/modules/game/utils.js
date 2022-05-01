const reverseBoard = (board) => [...board.map((row) => [...row.reverse()]).reverse()]

export {reverseBoard}
