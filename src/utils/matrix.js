export function project (vector, matrix) {
  if (vector.length === 2 && matrix.length === 2) {
    return vectorTimesMatrix(vector, matrix)
  }

  if (vector.length === 2 && matrix.length === 3) {
    let vector3d = [...vector, 1]
    let newVector = vectorTimesMatrix(vector3d, matrix)

    return [newVector[0] * newVector[2], newVector[1] * newVector[2]]
  }
}

export function vectorTimesMatrix (vector, matrix) {
  // We assume the matrix is of row-major order.
  // The matrix and vector must be of same length: either 2 or 3.
  let dim = vector.length

  if (matrix.length !== dim) {
    throw new Error(`Invalid input: matrix length ${matrix.length} is not equal
      to vector length ${vector.length}`)
  }

  let newVector = []

  for (let i = 0; i < dim; i++) {
    let iValue = 0

    if (matrix[i].length !== dim) {
      throw new Error(`Invalid matrix: not square`)
    }

    for (let j = 0; j < dim; j++) {
      iValue += (vector[j] * matrix[i][j])
    }
    newVector.push(iValue)
  }

  return newVector
}
