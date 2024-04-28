export function isElementInBoundaryElement(
  {
    element,
    boundaryElement,
    partial = false,
  }: {
    element: HTMLElement
    boundaryElement: HTMLElement
    partial?: boolean
  },
) {
  const elementRect = element.getBoundingClientRect()
  const boundaryElementRect = boundaryElement.getBoundingClientRect()

  const elementInnerY = elementRect.y + (partial ? elementRect.height : 0)
  const elementOuterY = elementRect.y + (partial ? 0 : elementRect.height)

  const elementInnerX = elementRect.x + (partial ? elementRect.width : 0)
  const elementOuterX = elementRect.x + (partial ? 0 : elementRect.width)

  const isInInnerYRange = elementInnerY >= boundaryElementRect.y
  const isInOuterYRange = elementOuterY <= boundaryElementRect.y + boundaryElementRect.height

  const isInInnerXRange = elementInnerX >= boundaryElementRect.x
  const isInOuterXRange = elementOuterX <= boundaryElementRect.x + boundaryElementRect.width

  return isInOuterYRange && isInInnerYRange && isInOuterXRange && isInInnerXRange
}
