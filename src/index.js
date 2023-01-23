const { set } = require("@jrc03c/js-math-tools")

function rotatePointAroundZero(point, angle) {
  let radius = getMagnitude(point)
  let theta = Math.atan(point[1] / point[0])
  if (point[0] < 0) theta += Math.PI

  return [radius * Math.cos(theta + angle), radius * Math.sin(theta + angle)]
}

function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1]
}

function getMagnitude(v) {
  return Math.sqrt(dot(v, v))
}

function isRightTurn(p1, p2, p3) {
  // translate all points such that p2 is at the origin
  let p1Temp = [p1[0] - p2[0], p1[1] - p2[1]]
  // let p2Temp = [0, 0]
  let p3Temp = [p3[0] - p2[0], p3[1] - p2[1]]

  // rotate all points such that p1Temp lies on the negative y-axis
  let angle = Math.atan(p1Temp[1] / p1Temp[0])
  if (p1Temp[0] < 0) angle += Math.PI
  p3Temp = rotatePointAroundZero(p3Temp, -angle + Math.PI / 2)
  return p3Temp[0] > 0
}

function getConvexHull(points) {
  if (points.length < 3) {
    throw new Error("A minimum of 3 points are needed to compute a hull!")
  }

  let frontier = points.slice().sort((a, b) => (a[0] < b[0] ? -1 : 1))
  let hull = [frontier[0]]

  while (hull.length < 3 || hull.at(-1) !== hull[0]) {
    let p1 = hull.at(-1)
    let p2 = frontier[0] === p1 ? frontier[1] : frontier[0]

    frontier.forEach(p3 => {
      if (p1 !== p3 && p2 !== p3 && isRightTurn(p1, p2, p3)) {
        p2 = p3
      }
    })

    hull.push(p2)
    frontier.splice(frontier.indexOf(p2), 1)
  }

  return set(hull.map(p => JSON.stringify(p))).map(p => JSON.parse(p))
}

if (typeof module !== "undefined") {
  module.exports = getConvexHull
}

if (typeof window !== "undefined") {
  window.getConvexHull = getConvexHull
}
