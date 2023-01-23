const {
  combinations,
  isEqual,
  normal,
  range,
} = require("@jrc03c/js-math-tools")

const getConvexHull = require(".")
const pointIsInTriangle = require("./point-is-in-triangle")

test("tests that the hull can be found correctly", () => {
  range(0, 100).forEach(() => {
    const points = normal([100, 2])
    const hull = getConvexHull(points)

    const triangles = combinations(
      hull.map(p => JSON.stringify(p)),
      3
    ).map(combo => combo.map(p => JSON.parse(p)))

    const nonHullPoints = points.filter(p => hull.every(h => !isEqual(h, p)))

    expect(
      nonHullPoints.every(p => !triangles.every(t => !pointIsInTriangle(p, t)))
    ).toBe(true)
  })
})
