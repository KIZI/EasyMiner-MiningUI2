export function waitForClickEvent() {
  return new Promise((resolve) => {
    const onClick = () => {
      resolve(true)
      document.removeEventListener('click', onClick)
    }

    document.addEventListener('click', onClick)
  })
}
