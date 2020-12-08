
const calculate = (input) => {
  const SUM = 2020
  let result
  let index = 0
  while (!result && index < input.length) {
    const num1 = input[index]
    let jindex = 1
    while (!result && jindex < input.length) {
      const num2 = input[jindex]
      const match = input.findIndex(num3 => num2 + num1 + num3 === SUM)
      if (match > 0) {
        result = num1 * num2 * input[match]
      }
      jindex ++
    } 
    index ++
  }

  return result
}
const input = require('./input.json')
const testInput = [1721,
  979,
  366,
  299,
  675,
  1456]
console.log(calculate(input))