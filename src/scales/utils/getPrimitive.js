export default function (domainType) {
  return domainType.startsWith('interval')
    ? domainType.split(':')[1]
    : domainType
}
