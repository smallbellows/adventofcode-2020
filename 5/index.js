const ROWS = 128
const SEATS = 8

const getRow = (seatInput) => {
  const rowInstructions = seatInput.substring(0, 7).split('')
  let start = 0
  let end = ROWS - 1
  rowInstructions.forEach(instruction => {
    const numRows = end - start + 1
    if (instruction === 'F') {
      end = end - numRows/2 
    } 
    if (instruction === 'B') {
      start = start + numRows/2 
    }
  })
  if (start !== end) {
    throw new Error('what?')
  }
  return start
}

const getSeat = (seatInput) => {
  const seatInstructions = seatInput.substring(7).split('')
  let start = 0
  let end = SEATS - 1
  seatInstructions.forEach(instruction => {
    const numSeats = end - start + 1
    if (instruction === 'L') {
      end = end - numSeats/2
    }
    if (instruction === 'R') {
      start = start + numSeats/2
    }
  })
  if (start !== end) {
    throw new Error('what?')
  }
  return start
}

const getSeatId = ({seat, row}) => row * 8 + seat

const input = require('./data')
const boardingPasses = input.split(/\r?\n/)


const seatIds = boardingPasses.map((pass) => {
  const seat = getSeat(pass)
  const row = getRow(pass)
  const seatId = getSeatId({seat, row})
  return seatId
})

const missingSeatIds = []
for (let row = 0; row < ROWS; row++) {
  for (let seat = 0; seat < SEATS; seat++) {
    const seatId = getSeatId({row, seat})
    if (!seatIds.includes(seatId)) {
      missingSeatIds.push(seatId)
    }
  }
}
// find seatId that doesn't have +1 and -1 of itself in the array (and isn't 0)
const seatOptions = []
for (let i=1; i<(getSeatId({row: ROWS-1, seat: SEATS-1})); i++) { // start with i = 1 because instructions say there's some seats missing at front
  if (missingSeatIds.indexOf(i+1) < 0 && missingSeatIds.indexOf(i-1) < 0) {
    const isIMissing = missingSeatIds.indexOf(i) >= 0
    if (isIMissing) {
      seatOptions.push(i)
    }
  }
}
console.log(seatOptions)

