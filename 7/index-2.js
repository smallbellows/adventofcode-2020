const input = require('./rules')
const rules = input.split('\n')

const EMPTY = 'no other bags'
const rulesObj = rules.reduce((obj, rule) => {
  const [outerBag, contents] = rule.replace('.', '').split(' contain ')
  const bagName = outerBag.replace(' bags', ' bag')
  if (obj[bagName]) throw new Error('what?')
  if (contents === EMPTY) {
    obj[bagName] = 0
  } else {
    const bags = contents.split(', ')
    const innerObj = bags.reduce((inner, bag) => {
      const count = bag.split(' ')[0]
      const color = bag.replace(count, '').trim().replace(' bags', ' bag')
      inner[color] = +count
      return inner
    }, {})
    obj[bagName] = innerObj
  }
  return obj
}, {})

let changeInSize = 0
let coloursToLookFor = ['shiny gold bag']
let count = 0
do {
  let currentCount = 0
  const newColours = []
  coloursToLookFor.forEach(bagColour => {
    const contents = rulesObj[bagColour]
    if (contents) {
      Object.entries(contents).forEach(([colour, number]) => {
        currentCount = currentCount + number
        for (let i=0;i<number;i++) newColours.push(colour)
      })
    }
  })
  count = count + currentCount
  coloursToLookFor = [...newColours]
  changeInSize = currentCount
} while (changeInSize > 0)

console.log(count)





