export const SelectTravelesList = [
  {
    id: 1,
    title: "Just Me",
    desc: "A solo travels in exploration",
    icon: "✈️",
    people: "1 people",
  },
  {
    id: 2,
    title: "A Couple",
    desc: "Two travels in tandem",
    icon: "🥂",
    people: "2 people",
  },
  {
    id: 3,
    title: "Family",
    desc: "A group of fun loving adv",
    icon: "🏡",
    people: "3 to 5 people",
  },
  {
    id: 4,
    title: "Friends",
    desc: "A bunch of thrill-seekes",
    icon: "⛵",
    people: "2 to 4 people",
  },
];

export const SelectBudgetOptions = [
  {
    id: 1,
    title: "Cheap",
    desc: "Stay conscious of cost",
    icon: "💵",
  },
  {
    id: 2,
    title: "Moderate",
    desc: "Keep cost on the average side",
    icon: "💰",
  },
  {
    id: 3,
    title: "Luxury",
    desc: "Dont worry about cash",
    icon: "🤑",
  },
];

export const AI_PROMPT =
  "Generate travel plan for location : {location} for {totalDays} days for {traveller} with a {budget} budget , Give me a hotel options list with hotel name, hotel address, price, hotel image url, geo cordinates, rating, descriptions, and suggest iternarie with place name , place details, Place image url, geo coding, ticket prising, rating , time travel of each location for {totalDays} days with each day plan with best time to vist and in the end provide estimited budget. Provide all this strictly in json format";
