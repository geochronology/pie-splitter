var Sugar = require("sugar");
var chance = require("chance").Chance();

const timeForge = (times, options) => {

  const { startValue = chance.integer({ min: 0, max: 1000000 }) } = options || chance.integer({ min: 0, max: 1000000 })
  const { step = { min: -2000, max: 10000 } } = options || 0
  const { label = "count" } = options || "count"

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
        { date: currentValue, [label]: totalCount, change: prevAcc }
      ],
      totalCount + acc,
      acc
    ]

  }, [[], startValue, 0])

  return withData[0]
}

console.log(timeForge(10, { startValue: 1000, step: { min: -20, max: 100 }, label: "cheeseSlices" }))