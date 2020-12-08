
const increment = ([x,y], [increaseX, increaseY]) => {
  return [x + increaseX, y + increaseY]
}

const countTreesInSlope = (slopeIncrease, grid) => {
  let position = [0,0]
  let countTrees = 0

  while (position[1] < grid.length) {

    const rowIndex = position[1] % grid.length
    const row = grid[rowIndex]
    const columnIndex = position[0] % row.length
    if (row[columnIndex] === TREE) {
      countTrees ++
    }
    position = increment(position, slopeIncrease)
  }
  return countTrees
}

const testInput = `..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#`

const input = require('./data')
const rows = input.split(/\r?\n/)

const grid = rows.map(r => r.split(''))
const TREE = '#'
const slopesToTry = [
  [1,1],
  [3,1],
  [5,1],
  [7,1],
  [1,2]
]
const product = slopesToTry.reduce((product, slope) => {
  const trees = countTreesInSlope(slope, grid)
  console.log(trees)
  product = product * trees
  return product
}, 1)
console.log(product)

