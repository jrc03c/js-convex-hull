// gist: check to see if a point lies inside a triangle
// https://gist.github.com/jrc03c/782f4ebd2a1b793cec2f3b70df423d0c

const ABOVE = "above"
const BELOW = "below"
const EXACTLY_ON = "exactly_on"

function getPointRelationToLine(point, pair) {
  const [p1, p2] = pair

  // if the pair have the same x-values, then they either lie on a
  // vertical line or are identical
  if (p2[0] - p1[0] === 0) {
    // if the pair also have the same y-values, then they're identical
    // and an error should be thrown
    if (p2[1] - p1[1] === 0) {
      throw new Error(
        "The pair of points provided are identical and therefore do not form a line!"
      )
    }

    // otherwise, return the relation of the point's x-value to the
    // pair's x-value
    return point[0] < p2[0] ? BELOW : point[0] === p2[0] ? EXACTLY_ON : ABOVE
  }

  const m = (p2[1] - p1[1]) / (p2[0] - p1[0])
  const b = p1[1] - m * p1[0]
  const tempY = m * point[0] + b

  if (point[1] === tempY) {
    return EXACTLY_ON
  } else if (point[1] > tempY) {
    return ABOVE
  } else {
    return BELOW
  }
}

function pointIsInTriangle(mouse, points) {
  const [p1, p2, p3] = points

  const rel1True = getPointRelationToLine(p3, [p1, p2])
  const rel1Pred = getPointRelationToLine(mouse, [p1, p2])

  if (rel1True !== rel1Pred && rel1Pred !== EXACTLY_ON) {
    return false
  }

  const rel2True = getPointRelationToLine(p2, [p1, p3])
  const rel2Pred = getPointRelationToLine(mouse, [p1, p3])

  if (rel2True !== rel2Pred && rel2Pred !== EXACTLY_ON) {
    return false
  }

  const rel3True = getPointRelationToLine(p1, [p2, p3])
  const rel3Pred = getPointRelationToLine(mouse, [p2, p3])

  if (rel3True !== rel3Pred && rel3Pred !== EXACTLY_ON) {
    return false
  }

  return true
}

if (typeof module !== "undefined") {
  module.exports = pointIsInTriangle
}

if (typeof window !== "undefined") {
  window.pointIsInTriangle = pointIsInTriangle
}
