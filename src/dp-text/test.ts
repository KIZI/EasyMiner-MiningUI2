function addNumbers(a: number, b: number): number {
  return a + b
}

addNumbers(1)

addNumbers(1, '2')

const values = [1, '2', true]

function getValueByIndex(index = 0) {
  const value = values[index]
  return value.toString()
}

document.addEventListener('click', (event) => {
  console.log(event.target)
  console.log(event.buton)
})

function toNumber(value: string | number) {
  console.log(value)

  if (typeof value === 'number') {
    return value
  }

  return Number.parseInt(value)
}

function toUppercase(value) {
  return value.toUpperCase()
}
toUppercase(1)

const books = [
  { id: 1, name: 'Book 1' },
  { id: 2, name: 'Book 2' },
  { id: 3, name: 'Book 3' },
]
function getBookNameById(id: number) {
  const book = books.find(book => book.id === id)
  return book.name
}

getBookNameById(4)
