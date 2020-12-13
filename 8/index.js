class AlreadyCalledError extends Error {
  constructor(message) {
    super(message)
    this.name = 'AlreadyCalledError'
  }
}
class Instruction {
  constructor(index, value) {
    this.index = index
    this.value = parseInt(value)
    this.called = 0
    this.type = ''
  }
  
  _checkCalled() {
    if (this.called > 1) throw new AlreadyCalledError()
  }
  follow(oldAccumulator) {
    return
  }
  reset() {
    this.called = 0
    return this
  }
}

class NOP extends Instruction {
  constructor(index, value) {
    super(index, value)
    this.type = 'nop'
  }

  follow(oldAccumulator) {
    this.called = this.called + 1
    this._checkCalled()
    return {index: this.index + 1, accumulator: oldAccumulator}
  }
  
  convert() {
    return new JMP(this.index, this.value)
  }
}

class ACC extends Instruction {
  constructor(index, value) {
    super(index, value)
    this.type = 'acc'
  }
  follow(oldAccumulator) {
    this.called = this.called + 1
    this._checkCalled()
    return {index: this.index + 1, accumulator: oldAccumulator + this.value}
  }
}

class JMP extends Instruction {
  constructor(index, value) {
    super(index, value)
    this.type = 'jmp'
  }
  
  follow(oldAccumulator) {
    this.called = this.called + 1
    this._checkCalled()
    return {index: this.index + this.value, accumulator: oldAccumulator}
  }
  convert() {
    return new NOP(this.index, this.value)
  }
}


const input = require('./input')

const steps = input.split('\n')

const buildInstruction = (type, index, value) => {
  if (type === 'jmp') return new JMP(index, value)
  if (type === 'nop') return new NOP(index, value)
  if (type === 'acc') return new ACC(index, value)
}

const runProgram = (currentAttempt) => {
  let accumulator = 0
  let index = 0
  while (index < currentAttempt.length) {
    const result = currentAttempt[index].follow(accumulator)
    accumulator = result.accumulator
    index = result.index
  }
  return accumulator
}

const instructions = steps.map((s, index)=> {
  const [type, value] = s.split(' ')
  return buildInstruction(type, index, value)
})

const getNextIndexToChange = (currentInstructions, lastChanged) => currentInstructions.findIndex(i => i.index > lastChanged && i.convert)
const buildNextAttempt = (currentInstructions, indexToChange) => {
  return currentInstructions.map(i => {
    if (i.index === indexToChange) {
      return i.convert()
    }
    return i.reset()
  })
}
let result
const isAttemptValid = (instructions) => {
  let isValid = false
  try {
    result = runProgram(instructions)
    isValid = true
  } catch{}
  return isValid
}

let i = 0
do {
  let newInstructions = buildNextAttempt(instructions, i)
  if (isAttemptValid(newInstructions)) {
    console.log(result)
  } else {
    i = getNextIndexToChange(instructions, i)
  }
} while (i < instructions.length && !result)


