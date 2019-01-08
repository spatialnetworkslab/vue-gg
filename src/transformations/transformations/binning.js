export default function (data, binningObj) {
	if (binningObj.constructor !== Object) {
		throw new Error('Binning only accepts an object')
	}

	if (this.$$dataContainer) {console.log(this.$$dataContainer)}

	for (let key in binningObj) {
		if (data.hasOwnProperty(key)) {
			let binCount = binningObj[key].binCount
			let binSize = binningObj[key].binSize
			let binInterval = binningObj[key].binInterval

			let variableData = data[key]

			if (!(binCount ^ binSize ^ binInterval)) {
				throw new Error('Please provide only one of the following: bin count, bin size, custom bin ranges')
			} else if (binCount) {
				let domain = variableDomain(variableData)
				let interval = (domain[1] - domain[0]) / binCount

				let ranges = rangeFromInterval(domain, interval, binCount)

				let newData = bin(variableData, ranges)
				console.log(newData)

				return newData
			} else if (binSize) {
				let domain = variableDomain(variableData)
				let binCount = math.round((domain[1] - domain[0]) / binSize)

				let ranges = rangeFromInterval(domain, binSize, binCount)

				let newData = bin(variableData, ranges)
				return newData
			} else {
				let newData = bin(variableData, binInterval)

				return newData
			}
		} else {
			console.warn(`Column '${key}' not found`)
		}
	}
}

function variableDomain (column) {
	let asc = column.sort((a, b) => a - b)

	let domain = []
	domain.push(asc[0])
	domain.push(asc.pop())

	return domain
}

function rangeFromInterval (domain, interval, binCount) {
	let ranges = []
	let lowerBound = domain[0]

	for (let i = 0; i < binCount; i ++) {
		let upperBound = lowerBound + interval

		ranges.push([lowerBound, upperBound])

		lowerBound = upperBound
	}

	return ranges
}

function binIndexFromValue (value, lowerBound, binInterval, upperBound) {
	if (value >= upperBound) {
		value -= 1
	}
	return Math.floor((value - lowerBound) / binInterval)
}

function bin (data, ranges) {
	let newData = {}

	newData.min = []
	newData.max = []
	newData.n = Array(ranges.length).fill(0)
	newData.sum = Array(ranges.length).fill(0)
	newData.average = []

    for (let ix = 0; ix < data.length; ix++) {
    	let instance = data[ix]
    	let binIndex = ranges.findIndex(el => instance >= el[0] && instance <= el[1])
    	console.log(binIndex)
    	newData.n[binIndex] ++
    	newData.sum[binIndex] = newData.sum[binIndex] + instance
    }

    for (let i = 0; i < ranges.length; i++) {
    	newData.min.push(ranges[i][0])
    	newData.max.push(ranges[i][1])

    	let a = newData.sum[i] / newData.n[i]

    	newData.average.push(a)
    }

    return newData
}
