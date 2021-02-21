
var chance = require("chance").Chance()

const pieSplitter = (numOfSlices, options) => {

  const { whole = 100 } = options || 100
  const { floatOrInt = 'int' } = options || 'int'

  // default value is 100
  let amount = whole || 100

  // use either float or integer slicing depending on options
  const slicer = numRange => {
    if (floatOrInt === 'int') return chance.integer(numRange)
    else if (floatOrInt === 'float') return chance.floating(numRange)
  }

  // return a slice size
  const handleSlice = (slicesRemaining) => {
    if (slicesRemaining === 1) return amount
    else {
      const sizeOfSlice = slicer({ min: 0, max: amount })
      amount -= sizeOfSlice
      return sizeOfSlice
    }
  }

  // recursively slice the pie until no more slices
  const sliceThePie = (slicesRemaining) => {
    return slicesRemaining < 1
      ? []
      : [handleSlice(slicesRemaining), ...sliceThePie(slicesRemaining - 1)]
  }

  return sliceThePie(numOfSlices)

}

// SYNTAX
// pieSplitter(slices, options)
// options:
//   whole: amount to slice (default: 100)
//   floatOrInt: number format ('float' or 'int', default is 'int')

console.log(pieSplitter(4, {
  whole: 763,
  floatOrInt: 'int'
}))

console.log(pieSplitter(3))

console.log(pieSplitter(12, { floatOrInt: 'float' }))
