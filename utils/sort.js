export const sortByDate = (key, arr) => {
  return arr.sort(
    (d1, d2) => new Date(d2[key]).getTime() - new Date(d1[key]).getTime()
  )
}

export const sortByVoteCount = (key, date, arr) => {
  return arr.sort((a, b) => {
    if (a[key] === b[key]) {
      if (a[date] > b[date]) {
        return -1
      } else {
        return 1
      }
    }
  })
}
