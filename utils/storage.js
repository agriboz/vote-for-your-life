const STORAGE_KEY = 'links'

export const storeLink = ({ item }) => {
  const keys = getKeys()
  const checkKeys = keys.some(({ name }) => name === item.name)

  if (!checkKeys) {
    store([...keys, item])
  } else {
    return false
  }
  return true
}

export const updateLink = ({ item }, type) => {
  const keys = getKeys()

  const checkType = type === 'increment' ? item.votes + 1 : item.votes - 1
  const lastUpdated = new Date()

  const update = keys.map((listItem) => {
    return listItem.date === item.date
      ? Object.assign(item, { votes: checkType, lastUpdated })
      : listItem
  })

  console.log(update)

  store(update)
}

export const removeLink = (linkItem) => {
  console.log('lan', linkItem)
  store(getKeys().filter((item) => item.name !== linkItem.name))
}

const store = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export const getKeys = () => {
  return localStorage.getItem(STORAGE_KEY)
    ? JSON.parse(localStorage.getItem(STORAGE_KEY))
    : []
}

export const clearLinks = () => {
  store([])
}
