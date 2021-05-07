Object.defineProperty(Array.prototype, "first", {
  get(){
    return this[0]
  },

  set(){
    throw new Error("The `first` property of an array is read-only!")
  },
})

Object.defineProperty(Array.prototype, "last", {
  get(){
    return this[this.length - 1]
  },

  set(){
    throw new Error("The `last` property of an array is read-only!")
  },
})

function dot(a, b){
  return a[0] * b[0] + a[1] * b[1]
}

function getMagnitude(v){
  return Math.sqrt(dot(v, v))
}

function getAngleBetweenVectors(a, b){
  return Math.acos(dot(a, b) / (getMagnitude(a) * getMagnitude(b)))
}

function getJarvisConvexHull(points){
  if (points.length < 3){
    throw new Error("A minimum of 3 points are needed to compute a hull!")
  }

  let frontier = points.slice().sort((a, b) => a.x - b.x)
  let hull = [frontier.shift()]

  while (hull.length < 3 && hull[0] !== hull[hull.length - 1]){
    let p1 = hull[hull.length - 1]
    let p2 = frontier[0]

    frontier.forEach(p3 => {
      if (p2 !== p3){
        let angle = getAngleBetweenVectors()
      }
    })
  }

  return hull
}
