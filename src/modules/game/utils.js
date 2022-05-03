const reverseBoard = (board) => [...board.map((row) => [...row.reverse()]).reverse()]
const isMyPiece = (position, user) => user.color.toLowerCase().startsWith(position.color)
const isCurrentTurn = (user, turn, item) => user.color.toLowerCase().startsWith(turn) && item.color === turn

export {reverseBoard, isMyPiece, isCurrentTurn}
