export default function () {
  return '_' + randomInt(10).toString()
}

function randomInt (digits) {
  return Math.floor(Math.pow(10, digits - 1) +
    Math.random() * (Math.pow(10, digits) - Math.pow(10, digits - 1) - 1))
}
