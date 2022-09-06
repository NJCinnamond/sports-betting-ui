const numToMonth: { [key: number]: string } = {
    0: "January",
    1: "February",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December",
}

const numToDay: { [key: number]: string } = {
    0: "Mon",
    1: "Tues",
    2: "Weds",
    3: "Thurs",
    4: "Fri",
    5: "Sat",
    6: "Sun",
}

export const dateToUTCString = (date: Date) => numToDay[date.getUTCDay()] + " " + date.getUTCDate() + " " + numToMonth[date.getUTCMonth()];