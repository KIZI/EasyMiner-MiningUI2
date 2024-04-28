export function persistElementPosition(el: HTMLElement) {
  const { x, y } = el.getBoundingClientRect()
  el.style.left = `${x}px`
  el.style.top = `${y}px`
  el.style.position = 'absolute'
}
