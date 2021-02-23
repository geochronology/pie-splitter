var chance = require("chance").Chance();
var artist = require("./artist");

// PIE SPLITTER
// A lib to split a pie into n randomized segments
// Not being used in production -- purpose is for MirageJS mocking

const { demographics } = artist
// console.log(artist)


const pieSplitter = (labels, options) => {
  const numOfSlices = Array.isArray(labels) // === "array"
    ? labels.length
    : typeof labels === "number"
      ? labels
      : 1

  console.log('numOfSlices:', numOfSlices)

  const { whole = 100 } = options || 100;
  const { floatOrInt = "int" } = options || "int";
  let { min = 0 } = options || 0;
  const { max = whole } = (options || 100);

  // default value is 100
  let amount = (whole || 100);

  // use either float or integer slicing depending on options
  const slicer = (numRange) => {
    let num;
    if (floatOrInt === "int") {
      do {
        num = chance.integer(numRange);
        // console.log('num: ', num)
      } while (num < min || num > max);
    } else if (floatOrInt === "float") {
      do {
        num = chance.floating(numRange);
      } while (num < min || num > max);
    }
    return num;
  };

  // return a slice size
  const handleSlice = (slicesRemaining) => {
    if (slicesRemaining === 1) return amount;
    else {
      const sizeOfSlice = slicer({ min: min, max: amount - (min * slicesRemaining) });
      amount -= sizeOfSlice;
      return sizeOfSlice;
    }
  };

  // recursively slice the pie until no more slices
  const sliceThePie = (slicesRemaining) => {
    return slicesRemaining < 1
      ? []
      : [handleSlice(slicesRemaining), ...sliceThePie(slicesRemaining - 1)];
  };

  // randomize the sequence of results
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array
  }

  // compute the split values
  // const splitValues = shuffleArray(sliceThePie(numOfSlices));
  const splitValues = shuffleArray(sliceThePie(numOfSlices));

  // check if there are labels provided
  if (Array.isArray(labels)) return labels.reduce((obj, key, idx) => ({ ...obj, [key]: splitValues[idx] }), {})
  else if (typeof labels === "number") return Array.from(Array(labels)).reduce((arr, key, idx) => ([...arr, splitValues[idx]]), [])
  else return splitValues
};

// SYNTAX
// pieSplitter(slices, options)
// options:
//   whole: amount to slice (default: 100)
//   floatOrInt: number format ('float' or 'int', default is 'int')

// console.log(
//   pieSplitter(4, {
//     whole: 763,
//     floatOrInt: "int",
//     max: 100,
//     min: 17
//   })
// );

// console.log(pieSplitter(3, { min: 20 }));
// console.log(pieSplitter(2, { floatOrInt: "float", min: 12 }));
// console.log(pieSplitter(["one", "two"]))

// console.log(pieSplitter(
//   ["apple", "orange", "banana"],
//   { min: 3, max: 10, whole: 20 }
// ))

console.log(pieSplitter(3))

// for (let [category, value] of Object.entries(demographics)) {
//   console.log({
//     [category]: pieSplitter(value, { min: 10, max: 20 })
//   })
// }

