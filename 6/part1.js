const getGroupScore = (group) => {
  
  const people = group.split("\n")
  const questionsAnswered = people.reduce((answered, person) => {
    const answers = person.split('')
    answers.forEach(a => {
      answered.add(a)
    })
    return answered
  }, new Set())
  return questionsAnswered.size
}


const input = require('./data')
const groups = input.split("\n\n")
const scoreSum = groups.reduce((sum, group) => sum + getGroupScore(group), 0)
console.log(scoreSum)