/**
* geostats() is a tiny and standalone javascript library for classification
* Project page - https://github.com/simogeo/geostats
* Copyright (c) 2011 Simon Georget, http://www.intermezzo-coop.eu
* Licensed under the MIT license
*/

var _t = function (str) {
  return str
}

// taking from http://stackoverflow.com/questions/18082/validate-decimal-numbers-in-javascript-isnumeric
var isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
}

export default function (a) {
  this.objectID = ''
  this.separator = ' - '
  this.legendSeparator = this.separator
  this.method = ''
  this.precision = 0
  this.precisionflag = 'auto'
  this.roundlength = 2 // Number of decimals, round values
  this.is_uniqueValues = false
  this.debug = false
  this.silent = false

  this.bounds = []
  this.ranges = []
  this.inner_ranges = null
  this.colors = []
  this.counter = []

  // statistics information
  this.stat_sorted = null
  this.stat_mean = null
  this.stat_median = null
  this.stat_sum = null
  this.stat_max = null
  this.stat_min = null
  this.stat_pop = null
  this.stat_variance = null
  this.stat_stddev = null
  this.stat_cov = null

  /**
 * logging method
 */
  this.log = function (msg, force) {
    if (this.debug === true || force != null) {
      console.log(this.objectID + '(object id) :: ' + msg)
    }
  }

  /**
 * Set bounds
 */
  this.setBounds = function (a) {
    this.log('Setting bounds (' + a.length + ') : ' + a.join())

    this.bounds = [] // init empty array to prevent bug when calling classification after another with less items (sample getQuantile(6) and getQuantile(4))

    this.bounds = a
    // this.bounds = this.decimalFormat(a);
  }

  /**
 * Set a new serie
 */
  this.setSerie = function (a) {
    this.log('Setting serie (' + a.length + ') : ' + a.join())

    this.serie = [] // init empty array to prevent bug when calling classification after another with less items (sample getQuantile(6) and getQuantile(4))
    this.serie = a

    // reset statistics after changing serie
    this.resetStatistics()

    this.setPrecision()
  }

  /**
 * Set colors
 */
  this.setColors = function (colors) {
    this.log('Setting color ramp (' + colors.length + ') : ' + colors.join())

    this.colors = colors
  }

  /**
   * Get feature count
   * With bounds array(0, 0.75, 1.5, 2.25, 3);
   * should populate this.counter with 5 keys
   * and increment counters for each key
   */
  this.doCount = function () {
    if (this._nodata()) { return }

    var tmp = this.sorted()

    this.counter = []

    // we init counter with 0 value
    for (let i = 0; i < this.bounds.length - 1; i++) {
      this.counter[i] = 0
    }

    for (let j = 0; j < tmp.length; j++) {
      // get current class for value to increment the counter
      var cclass = this.getClass(tmp[j])
      this.counter[cclass]++
    }
  }

  /**
   * Set decimal precision according to user input
   * or automatcally determined according
   * to the given serie.
   */
  this.setPrecision = function (decimals) {
    // only when called from user
    if (typeof decimals !== 'undefined') {
      this.precisionflag = 'manual'
      this.precision = decimals
    }

    // we calculate the maximal decimal length on given serie
    if (this.precisionflag === 'auto') {
      for (var i = 0; i < this.serie.length; i++) {
        // check if the given value is a number and a float
        var precision
        if (!isNaN((this.serie[i] + '')) && (this.serie[i] + '').toString().indexOf('.') !== -1) {
          precision = (this.serie[i] + '').split('.')[1].length
        } else {
          precision = 0
        }

        if (precision > this.precision) {
          this.precision = precision
        }
      }
    }
    if (this.precision > 20) {
      // prevent "Uncaught RangeError: toFixed() digits argument must be between 0 and 20" bug. See https://github.com/simogeo/geostats/issues/34
      this.log('this.precision value (' + this.precision + ') is greater than max value. Automatic set-up to 20 to prevent "Uncaught RangeError: toFixed()" when calling decimalFormat() method.')
      this.precision = 20
    }

    this.log('Calling setPrecision(). Mode : ' + this.precisionflag + ' - Decimals : ' + this.precision)

    this.serie = this.decimalFormat(this.serie)
  }

  /**
   * Format array numbers regarding to precision
   */
  this.decimalFormat = function (a) {
    var b = []

    for (var i = 0; i < a.length; i++) {
      // check if the given value is a number
      if (isNumber(a[i])) {
        b[i] = parseFloat(parseFloat(a[i]).toFixed(this.precision))
      } else {
        b[i] = a[i]
      }
    }

    return b
  }

  /**
   * Transform a bounds array to a range array the following array : array(0,
   * 0.75, 1.5, 2.25, 3); becomes : array('0-0.75', '0.75-1.5', '1.5-2.25',
   * '2.25-3');
   */
  this.setRanges = function () {
    this.ranges = [] // init empty array to prevent bug when calling classification after another with less items (sample getQuantile(6) and getQuantile(4))

    for (let i = 0; i < (this.bounds.length - 1); i++) {
      this.ranges[i] = this.bounds[i] + this.separator + this.bounds[i + 1]
    }
  }

  /** return min value */
  this.min = function () {
    if (this._nodata()) { return }

    this.stat_min = this.serie[0]

    for (let i = 0; i < this.pop(); i++) {
      if (this.serie[i] < this.stat_min) {
        this.stat_min = this.serie[i]
      }
    }

    return this.stat_min
  }

  /** return max value */
  this.max = function () {
    if (this._nodata()) { return }

    this.stat_max = this.serie[0]
    for (let i = 0; i < this.pop(); i++) {
      if (this.serie[i] > this.stat_max) {
        this.stat_max = this.serie[i]
      }
    }

    return this.stat_max
  }

  /** return sum value */
  this.sum = function () {
    if (this._nodata()) { return }

    if (this.stat_sum === null) {
      this.stat_sum = 0
      for (let i = 0; i < this.pop(); i++) {
        this.stat_sum += parseFloat(this.serie[i])
      }
    }

    return this.stat_sum
  }

  /** return population number */
  this.pop = function () {
    if (this._nodata()) { return }

    if (this.stat_pop === null) {
      this.stat_pop = this.serie.length
    }

    return this.stat_pop
  }

  /** return mean value */
  this.mean = function () {
    if (this._nodata()) { return }

    if (this.stat_mean === null) {
      this.stat_mean = parseFloat(this.sum() / this.pop())
    }

    return this.stat_mean
  }

  /** return median value */
  this.median = function () {
    if (this._nodata()) { return }

    if (this.stat_median === null) {
      this.stat_median = 0
      var tmp = this.sorted()

      // serie pop is odd
      if (tmp.length % 2) {
        this.stat_median = parseFloat(tmp[(Math.ceil(tmp.length / 2) - 1)])

      // serie pop is even
      } else {
        this.stat_median = (parseFloat(tmp[((tmp.length / 2) - 1)]) + parseFloat(tmp[(tmp.length / 2)])) / 2
      }
    }

    return this.stat_median
  }

  /** return variance value */
  this.variance = function (round) {
    round = (typeof round === 'undefined')

    if (this._nodata()) { return }

    if (this.stat_variance === null) {
      var tmp = 0
      var serieMean = this.mean()
      for (var i = 0; i < this.pop(); i++) {
        tmp += Math.pow((this.serie[i] - serieMean), 2)
      }

      this.stat_variance = tmp / this.pop()

      if (round === true) {
        this.stat_variance = Math.round(this.stat_variance * Math.pow(10, this.roundlength)) / Math.pow(10, this.roundlength)
      }
    }

    return this.stat_variance
  }

  /** return standard deviation value */
  this.stddev = function (round) {
    round = (typeof round === 'undefined')

    if (this._nodata()) { return }

    if (this.stat_stddev === null) {
      this.stat_stddev = Math.sqrt(this.variance())

      if (round === true) {
        this.stat_stddev = Math.round(this.stat_stddev * Math.pow(10, this.roundlength)) / Math.pow(10, this.roundlength)
      }
    }

    return this.stat_stddev
  }

  /** coefficient of variation - measure of dispersion */
  this.cov = function (round) {
    round = (typeof round === 'undefined')

    if (this._nodata()) { return }

    if (this.stat_cov === null) {
      this.stat_cov = this.stddev() / this.mean()

      if (round === true) {
        this.stat_cov = Math.round(this.stat_cov * Math.pow(10, this.roundlength)) / Math.pow(10, this.roundlength)
      }
    }

    return this.stat_cov
  }

  /** reset all attributes after setting a new serie */
  this.resetStatistics = function () {
    this.stat_sorted = null
    this.stat_mean = null
    this.stat_median = null
    this.stat_sum = null
    this.stat_max = null
    this.stat_min = null
    this.stat_pop = null
    this.stat_variance = null
    this.stat_stddev = null
    this.stat_cov = null
  }

  /** data test */
  this._nodata = function () {
    if (this.serie.length === 0) {
      if (this.silent) this.log('[silent mode] Error. You should first enter a serie!', true)
      else throw new TypeError('Error. You should first enter a serie!')
      return 1
    } else { return 0 }
  }

  /** ensure nbClass is an integer */
  this._nbClassInt = function (nbClass) {
    var nbclassTmp = parseInt(nbClass, 10)
    if (isNaN(nbclassTmp)) {
      if (this.silent) this.log("[silent mode] '" + nbclassTmp + "' is not a valid integer. Enable to set class number.", true)
      else throw new TypeError("'" + nbclassTmp + "' is not a valid integer. Enable to set class number.")
    } else {
      return nbclassTmp
    }
  }

  /** check if the serie contains negative value */
  this._hasNegativeValue = function () {
    for (let i = 0; i < this.serie.length; i++) {
      if (this.serie[i] < 0) { return true }
    }
    return false
  }

  /** check if the serie contains zero value */
  this._hasZeroValue = function () {
    for (let i = 0; i < this.serie.length; i++) {
      if (parseFloat(this.serie[i]) === 0) { return true }
    }
    return false
  }

  /** return sorted values (as array) */
  this.sorted = function () {
    if (this.stat_sorted === null) {
      if (this.is_uniqueValues === false) {
        this.stat_sorted = this.serie.sort(function (a, b) {
          return a - b
        })
      } else {
        this.stat_sorted = this.serie.sort(function (a, b) {
          var nameA = a.toString().toLowerCase(); var nameB = b.toString().toLowerCase()
          if (nameA < nameB) return -1
          if (nameA > nameB) return 1
          return 0
        })
      }
    }

    return this.stat_sorted
  }

  /**
 * Set Manual classification Return an array with bounds : ie array(0,
 * 0.75, 1.5, 2.25, 3);
 * Set ranges and prepare data for displaying legend
 *
 */
  this.setClassManually = function (array) {
    if (this._nodata()) { return }

    if (array[0] !== this.min() || array[array.length - 1] !== this.max()) {
      if (this.silent) this.log('[silent mode] ' + _t('Given bounds may not be correct! please check your input.\nMin value : ' + this.min() + ' / Max value : ' + this.max()), true)
      else throw new TypeError(_t('Given bounds may not be correct! please check your input.\nMin value : ' + this.min() + ' / Max value : ' + this.max()))
      return
    }

    this.setBounds(array)
    this.setRanges()

    // we specify the classification method
    this.method = _t('manual classification') + ' (' + (array.length - 1) + ' ' + _t('classes') + ')'

    return this.bounds
  }

  /**
 * Equal intervals classification Return an array with bounds : ie array(0,
 * 0.75, 1.5, 2.25, 3);
 */
  this.getClassEqInterval = function (nbClass, forceMin, forceMax) {
    nbClass = this._nbClassInt(nbClass) // ensure nbClass is an integer

    if (this._nodata()) { return }

    var tmpMin = (typeof forceMin === 'undefined') ? this.min() : forceMin
    var tmpMax = (typeof forceMax === 'undefined') ? this.max() : forceMax

    var a = []
    var val = tmpMin
    var interval = (tmpMax - tmpMin) / nbClass

    for (let i = 0; i <= nbClass; i++) {
      a[i] = val
      val += interval
    }

    // -> Fix last bound to Max of values
    a[nbClass] = tmpMax

    this.setBounds(a)
    this.setRanges()

    // we specify the classification method
    this.method = _t('eq. intervals') + ' (' + nbClass + ' ' + _t('classes') + ')'

    return this.bounds
  }

  this.getQuantiles = function (nbClass) {
    nbClass = this._nbClassInt(nbClass) // ensure nbClass is an integer

    var tmp = this.sorted()
    var quantiles = []

    var step = this.pop() / nbClass
    for (var i = 1; i < nbClass; i++) {
      var qidx = Math.round(i * step + 0.49)
      quantiles.push(tmp[qidx - 1]) // zero-based
    }

    return quantiles
  }

  /**
 * Quantile classification Return an array with bounds : ie array(0, 0.75,
 * 1.5, 2.25, 3);
 */
  this.getClassQuantile = function (nbClass) {
    nbClass = this._nbClassInt(nbClass) // ensure nbClass is an integer

    if (this._nodata()) { return }

    var tmp = this.sorted()
    var bounds = this.getQuantiles(nbClass)
    bounds.unshift(tmp[0])

    if (bounds[tmp.length - 1] !== tmp[tmp.length - 1]) { bounds.push(tmp[tmp.length - 1]) }

    this.setBounds(bounds)
    this.setRanges()

    // we specify the classification method
    this.method = _t('quantile') + ' (' + nbClass + ' ' + _t('classes') + ')'

    return this.bounds
  }

  /**
 * Standard Deviation classification
 * Return an array with bounds : ie array(0,
 * 0.75, 1.5, 2.25, 3);
 */
  this.getClassStdDeviation = function (nbClass, matchBounds) {
    nbClass = this._nbClassInt(nbClass) // ensure nbClass is an integer

    if (this._nodata()) { return }

    var tmpMax = this.max()
    var tmpMin = this.min()
    var tmpStdDev = this.stddev()
    var tmpMean = this.mean()

    var a = []

    // number of classes is odd
    if (nbClass % 2 === 1) {
      // Euclidean division to get the inferior bound
      var infBound = Math.floor(nbClass / 2)

      var supBound = infBound + 1

      // we set the central bounds
      a[infBound] = tmpMean - (tmpStdDev / 2)
      a[supBound] = tmpMean + (tmpStdDev / 2)

      // Values < to infBound, except first one
      for (let i = infBound - 1; i > 0; i--) {
        let val = a[i + 1] - tmpStdDev
        a[i] = val
      }

      // Values > to supBound, except last one
      for (let i = supBound + 1; i < nbClass; i++) {
        let val = a[i - 1] + tmpStdDev
        a[i] = val
      }

      // number of classes is even
    } else {
      var meanBound = nbClass / 2

      // we get the mean value
      a[meanBound] = tmpMean

      // Values < to the mean, except first one
      for (let i = meanBound - 1; i > 0; i--) {
        let val = a[i + 1] - tmpStdDev
        a[i] = val
      }

      // Values > to the mean, except last one
      for (let i = meanBound + 1; i < nbClass; i++) {
        let val = a[i - 1] + tmpStdDev
        a[i] = val
      }
    }

    // we finally set the first value
    // do we excatly match min value or not ?
    a[0] = (typeof matchBounds === 'undefined') ? a[1] - tmpStdDev : tmpMin

    // we finally set the last value
    // do we excatly match max value or not ?
    a[nbClass] = (typeof matchBounds === 'undefined') ? a[nbClass - 1] + tmpStdDev : tmpMax

    this.setBounds(a)
    this.setRanges()

    // we specify the classification method
    this.method = _t('std deviation') + ' (' + nbClass + ' ' + _t('classes') + ')'

    return this.bounds
  }

  /**
 * Geometric Progression classification
 * http://en.wikipedia.org/wiki/Geometric_progression
 * Return an array with bounds : ie array(0,
 * 0.75, 1.5, 2.25, 3);
 */
  this.getClassGeometricProgression = function (nbClass) {
    nbClass = this._nbClassInt(nbClass) // ensure nbClass is an integer

    if (this._nodata()) { return }

    if (this._hasNegativeValue() || this._hasZeroValue()) {
      if (this.silent) this.log('[silent mode] ' + _t('geometric progression can\'t be applied with a serie containing negative or zero values.'), true)
      else throw new TypeError(_t('geometric progression can\'t be applied with a serie containing negative or zero values.'))
      return
    }

    var a = []
    var tmpMin = this.min()
    var tmpMax = this.max()

    var logMax = Math.log(tmpMax) / Math.LN10 // max decimal logarithm (or base 10)
    var logMin = Math.log(tmpMin) / Math.LN10 // min decimal logarithm (or base 10)

    var interval = (logMax - logMin) / nbClass

    // we compute log bounds
    for (let i = 0; i < nbClass; i++) {
      if (i === 0) {
        a[i] = logMin
      } else {
        a[i] = a[i - 1] + interval
      }
    }

    // we compute antilog
    a = a.map(function (x) { return Math.pow(10, x) })

    // and we finally add max value
    a.push(this.max())

    this.setBounds(a)
    this.setRanges()

    // we specify the classification method
    this.method = _t('geometric progression') + ' (' + nbClass + ' ' + _t('classes') + ')'

    return this.bounds
  }

  /**
 * Arithmetic Progression classification
 * http://en.wikipedia.org/wiki/Arithmetic_progression
 * Return an array with bounds : ie array(0,
 * 0.75, 1.5, 2.25, 3);
 */
  this.getClassArithmeticProgression = function (nbClass) {
    nbClass = this._nbClassInt(nbClass) // ensure nbClass is an integer

    if (this._nodata()) { return }

    var denominator = 0

    // we compute the (french) "Raison"
    for (let i = 1; i <= nbClass; i++) {
      denominator += i
    }

    var a = []
    var tmpMin = this.min()
    var tmpMax = this.max()

    var interval = (tmpMax - tmpMin) / denominator

    for (let i = 0; i <= nbClass; i++) {
      if (i === 0) {
        a[i] = tmpMin
      } else {
        a[i] = a[i - 1] + (i * interval)
      }
    }

    this.setBounds(a)
    this.setRanges()

    // we specify the classification method
    this.method = _t('arithmetic progression') + ' (' + nbClass + ' ' + _t('classes') + ')'

    return this.bounds
  }

  /**
 * Credits : Doug Curl (javascript) and Daniel J Lewis (python implementation)
 * http://www.arcgis.com/home/item.html?id=0b633ff2f40d412995b8be377211c47b
 * http://danieljlewis.org/2010/06/07/jenks-natural-breaks-algorithm-in-python/
 */
  this.getClassJenks = function (nbClass) {
    nbClass = this._nbClassInt(nbClass) // ensure nbClass is an integer

    if (this._nodata()) { return }

    let dataList = this.sorted()

    // now iterate through the datalist:
    // determine mat1 and mat2
    // really not sure how these 2 different arrays are set - the code for
    // each seems the same!
    // but the effect are 2 different arrays: mat1 and mat2
    var mat1 = []
    for (var x = 0, xl = dataList.length + 1; x < xl; x++) {
      var temp = []
      for (var j = 0, jl = nbClass + 1; j < jl; j++) {
        temp.push(0)
      }
      mat1.push(temp)
    }

    var mat2 = []
    for (var i = 0, il = dataList.length + 1; i < il; i++) {
      var temp2 = []
      for (var c = 0, cl = nbClass + 1; c < cl; c++) {
        temp2.push(0)
      }
      mat2.push(temp2)
    }

    // absolutely no idea what this does - best I can tell, it sets the 1st
    // group in the
    // mat1 and mat2 arrays to 1 and 0 respectively
    for (var y = 1, yl = nbClass + 1; y < yl; y++) {
      mat1[0][y] = 1
      mat2[0][y] = 0
      for (var t = 1, tl = dataList.length + 1; t < tl; t++) {
        mat2[t][y] = Infinity
      }
      var v = 0.0
    }

    // and this part - I'm a little clueless on - but it works
    // pretty sure it iterates across the entire dataset and compares each
    // value to
    // one another to and adjust the indices until you meet the rules:
    // minimum deviation
    // within a class and maximum separation between classes
    for (var l = 2, ll = dataList.length + 1; l < ll; l++) {
      var s1 = 0.0
      var s2 = 0.0
      var w = 0.0
      for (var m = 1, ml = l + 1; m < ml; m++) {
        var i3 = l - m + 1
        var val = parseFloat(dataList[i3 - 1])
        s2 += val * val
        s1 += val
        w += 1
        v = s2 - (s1 * s1) / w
        var i4 = i3 - 1
        if (i4 !== 0) {
          for (var p = 2, pl = nbClass + 1; p < pl; p++) {
            if (mat2[l][p] >= (v + mat2[i4][p - 1])) {
              mat1[l][p] = i3
              mat2[l][p] = v + mat2[i4][p - 1]
            }
          }
        }
      }
      mat1[l][1] = 1
      mat2[l][1] = v
    }

    var k = dataList.length
    var kclass = []

    // fill the kclass (classification) array with zeros:
    for (i = 0; i <= nbClass; i++) {
      kclass.push(0)
    }

    // this is the last number in the array:
    kclass[nbClass] = parseFloat(dataList[dataList.length - 1])
    // this is the first number - can set to zero, but want to set to lowest
    // to use for legend:
    kclass[0] = parseFloat(dataList[0])
    var countNum = nbClass
    while (countNum >= 2) {
      var id = parseInt((mat1[k][countNum]) - 2)
      kclass[countNum - 1] = dataList[id]
      k = parseInt((mat1[k][countNum] - 1))
      // spits out the rank and value of the break values:
      // console.log("id="+id,"rank = " + String(mat1[k][countNum]),"val =
      // " + String(dataList[id]))
      // count down:
      countNum -= 1
    }
    // check to see if the 0 and 1 in the array are the same - if so, set 0
    // to 0:
    if (kclass[0] === kclass[1]) {
      kclass[0] = 0
    }

    this.setBounds(kclass)
    this.setRanges()

    this.method = _t('Jenks') + ' (' + nbClass + ' ' + _t('classes') + ')'

    return this.bounds // array of breaks
  }

  /**
 * Quantile classification Return an array with bounds : ie array(0, 0.75,
 * 1.5, 2.25, 3);
 */
  this.getClassUniqueValues = function () {
    if (this._nodata()) { return }

    this.is_uniqueValues = true
    var tmp = this.sorted() // display in alphabetical order

    var a = []

    for (let i = 0; i < this.pop(); i++) {
      if (a.indexOf(tmp[i]) === -1) {
        a.push(tmp[i])
      }
    }

    this.bounds = a

    // we specify the classification method
    this.method = _t('unique values')

    return a
  }

  /**
 * Return the class of a given value.
 * For example value : 6
 * and bounds array = (0, 4, 8, 12);
 * Return 2
 */
  this.getClass = function (value) {
    for (let i = 0; i < this.bounds.length; i++) {
      if (this.is_uniqueValues === true) {
        if (value === this.bounds[i]) { return i }
      } else {
      // parseFloat() is necessary
        if (parseFloat(value) <= this.bounds[i + 1]) {
          return i
        }
      }
    }

    return _t("Unable to get value's class.")
  }

  /**
 * Return the ranges array : array('0-0.75', '0.75-1.5', '1.5-2.25',
 * '2.25-3');
 */
  this.getRanges = function () {
    return this.ranges
  }

  /**
 * Returns the number/index of this.ranges that value falls into
 */
  this.getRangeNum = function (value) {
    var bounds, i

    for (i = 0; i < this.ranges.length; i++) {
      bounds = this.ranges[i].split(/ - /)
      if (value <= parseFloat(bounds[1])) {
        return i
      }
    }
  }

  /*
 * Compute inner ranges based on serie.
 * Produce discontinous ranges used for legend - return an array similar to :
 * array('0.00-0.74', '0.98-1.52', '1.78-2.25', '2.99-3.14');
 * If inner ranges already computed, return array values.
 */
  this.getInnerRanges = function () {
    // if already computed, we return the result
    if (this.inner_ranges != null) {
      return this.inner_ranges
    }

    var a = []
    var tmp = this.sorted()
    var cnt = 1 // bounds array counter

    for (let i = 0; i < tmp.length; i++) {
      let rangeFirstValue
      if (i === 0) {
        rangeFirstValue = tmp[i] // we init first range value
      }

      if (parseFloat(tmp[i]) > parseFloat(this.bounds[cnt])) {
        a[cnt - 1] = '' + rangeFirstValue + this.separator + tmp[i - 1]

        rangeFirstValue = tmp[i]

        cnt++
      }

      // we reach the last range, we finally complete manually
      // and return the array
      if (cnt === (this.bounds.length - 1)) {
      // we set the last value
        a[cnt - 1] = '' + rangeFirstValue + this.separator + tmp[tmp.length - 1]

        this.inner_ranges = a
        return this.inner_ranges
      }
    }
  }

  this.getSortedlist = function () {
    return this.sorted().join(', ')
  }

  // object constructor
  // At the end of script. If not setPrecision() method is not known

  // we create an object identifier for debugging
  this.objectID = new Date().getUTCMilliseconds()
  this.log('Creating new geostats object')

  if (typeof a !== 'undefined' && a.length > 0) {
    this.serie = a
    this.setPrecision()
    this.log('Setting serie (' + a.length + ') : ' + a.join())
  } else {
    this.serie = []
  }

  // creating aliases on classification function for backward compatibility
  this.getJenks = this.getClassJenks
  this.getGeometricProgression = this.getClassGeometricProgression
  this.getEqInterval = this.getClassEqInterval
  this.getQuantile = this.getClassQuantile
  this.getStdDeviation = this.getClassStdDeviation
  this.getUniqueValues = this.getClassUniqueValues
  this.getArithmeticProgression = this.getClassArithmeticProgression
}
