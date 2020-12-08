const numericRegex = new RegExp("^[0-9]+$")
const colorRegex = new RegExp("^#([0-9a-f]{6}$)")
const allowedECL = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']
const CM = 'cm'
const IN = 'in'
const isDigits = (value) => {
  return Boolean(value.match(numericRegex))
}

const validators = {
  byr: (value) => value && isDigits(value) && +value >= 1920 && +value <= 2002,
  iyr: (value) => value && isDigits(value) && +value >= 2010 && +value <= 2020,
  eyr: (value) => value && isDigits(value) && +value >= 2020 && +value <= 2030,
  hgt: (value) => {
    if (!value) return false
    const units = value.includes(CM) ? CM : value.includes(IN) ? IN : ''
    let height = value.replace(units, '')
    if (units === CM) {
      return +height >= 150 && +height <= 193
    } else if (units === IN) {
      return +height >= 59 && +height <= 76
    } 
    return false 
  },
  hcl: (value) => value && Boolean(value.match(colorRegex)),
  ecl: (value) => value && allowedECL.includes(value),
  pid: (value) => value && isDigits(value) && value.length === 9,
}

const input = require('./data')

const passports = input.split('\n\n')
let countValid = 0
const replacer = new RegExp('\n', 'g')
passports.forEach(passport => {
  const passportRaw = passport.replace(replacer, ' ')
  const passportItems = passportRaw.split(' ')
  const passportObj = passportItems.reduce((obj, item) => {
    const[key,value] = item.split(':')
    obj[key] = value
    return obj
  }, {})
  const isValid = Object.entries(validators).every(([key, validator]) => {
    if (validator) {
      const value = passportObj[key]
      return validator(value)
    } else {
      return true
    }
  })
  if (isValid) countValid ++
})
console.log(countValid)
