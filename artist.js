const ARTIST_MODEL = {
  demographics: {
    gender: ["female", "male"],
    ethnicity: [
      "asian",
      "asian_pacific_islander",
      "hispanic",
      "white",
      "black"
    ],
    income: [
      "k_under_2",
      "k_25_50",
      "k_50_100",
      "k_100_150",
      "k_150_plus"
    ],
    education: [
      "some_college_or_associate_degree",
      "graduate_degree",
      "bachelor_degree",
      "high_school_degree",
      "less_than_high_school_degree"
    ],
    age: [
      "a18_29",
      "a30_44",
      "a45_60",
      "a60_plus"
    ],
    location: [
      "east_north_central",
      "east_south_central",
      "middle_atlantic",
      "mountain",
      "new_england",
      "pacific",
      "south_atlantic",
      "west_south_central"
    ]
  }
}

module.exports = ARTIST_MODEL