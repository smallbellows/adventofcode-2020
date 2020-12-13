const PREAMBLE_LENGTH = 25

const getValidNumber = (num, listOfNumbersToCheck) => {
  const valid = listOfNumbersToCheck.some((num1, index1) => {
    return listOfNumbersToCheck.some((num2, index2) => {
      return index1 !== index2 && num1 + num2 === num
    })
  })
  return valid
}

const input = require('./input')
const numbers = input.split('\n').map(n => parseInt(n))

const firstInvalid = numbers.find((num, index) => {
  if (index < PREAMBLE_LENGTH) return false
  const toCheck = numbers.slice(index-PREAMBLE_LENGTH, index)
  return !getValidNumber(num, toCheck)
})
console.log('part 1 result', firstInvalid)

if (firstInvalid) {
  const SUM = firstInvalid
  let firstNumber, lastNumber
  firstNumber = numbers.find((n1, i1) => {
    lastNumber = numbers.find((n2, i2) => {
      let sumToTry = 0
      for (let i = i1; i<=i2;i++) {
        sumToTry = sumToTry + numbers[i]
      }
      return sumToTry === SUM
    })
    return lastNumber
  })
  const firstIndex = numbers.findIndex(i => i === firstNumber)
  
  const lastIndex = numbers.findIndex(i => i === lastNumber)
  const setOfNumbers = numbers.slice(firstIndex, lastIndex + 1).sort((a, b) => a - b)
  const encryptionWeakness = setOfNumbers[0] + setOfNumbers[setOfNumbers.length -1]
  console.log('part 2 result', encryptionWeakness)
}