import fs from "fs"
import path from "path"

const file = path.join(process.cwd(), "data.json")

export function readBoard() {
  if (!fs.existsSync(file)) return null
  const data = fs.readFileSync(file)
  return JSON.parse(data)
}

export function writeBoard(board) {
  fs.writeFileSync(file, JSON.stringify(board, null, 2))
}
