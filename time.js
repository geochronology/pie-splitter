var Sugar = require("sugar");
var chance = require("chance").Chance();

const timeForge = (times, { startValue, step }) => {

  const { Date } = Sugar

  let dates = [...Array(times).keys()]
    .map((days) => {
      return new Date().rewind({ days }).format('%Y-%m-%d').raw
    })

  const minMax = ({ min, max }) => chance.integer({ min, max })

  const withData = dates.reduceRight(([arrOfObj, totalCount, prevAcc], currentValue) => {

    let acc = minMax(step)

    return [
      [
        ...arrOfObj,
        { date: currentValue, numOfFigs: totalCount, change: prevAcc }
      ],
      totalCount + acc,
      acc
    ]

  }, [[], startValue, 0])

  return withData[0]
}

console.log(timeForge(10, { startValue: 1000, step: { min: -20, max: 100 } }))