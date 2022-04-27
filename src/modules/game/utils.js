const Moves = (board, color) => ({
  board,
  getSelected() {
    const rows = this.board.find((row) => row.some(({selected}) => selected))
    return rows ? rows.find((item) => item.selected) : null
  },
  findPiece(position) {
    const rows = this.board.find((row) => row.some((item) => item.position === position))
    return rows ? rows.find((item) => item.position === position) : null
  },
  isMyPiece(position) {
    return this.findPiece(position).piece.startsWith(color[0])
  }
})

export {Moves}
