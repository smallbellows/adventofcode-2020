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
let possibleColours = []
do {
  const coloursThatMayContain = Object.keys(rulesObj).filter(ruleKey => {
    const contains = rulesObj[ruleKey]
    return Object.entries(contains).some(([key, value]) => {
      return coloursToLookFor.includes(key) && value})
  })
  coloursToLookFor = Array.from(new Set(coloursThatMayContain))
  possibleColours = possibleColours.concat(coloursToLookFor)
  changeInSize = coloursToLookFor.length
} while (changeInSize > 0)

console.log((new Set(possibleColours)).size)





