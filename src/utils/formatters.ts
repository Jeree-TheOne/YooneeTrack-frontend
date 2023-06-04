const second = 1000
const minute = 60 * second
const hour = 60 * minute
const day = 8 * hour
const names = ['d', 'h', 'm', 's']

export function capitalizeFirstLetter(string: string): string {
  if (!string.length) return ''
  return string[0].toUpperCase() + string.slice(1)
}

export function fromNumberToTime(number: number): string {
  let time = []
  let timeNumber = number
  const days = Math.trunc(timeNumber / day)
  if (days !== 0) {
    time.push(`${days}d`)
    timeNumber -= days * day
  }

  const hours = Math.trunc(timeNumber / hour)
  if (hours !== 0) {
    time.push(`${hours}h`)
    timeNumber -= hours * hour
  }

  const minutes = Math.trunc(timeNumber / minute)
  if (minutes !== 0) {
    time.push(`${minutes}m`)
    timeNumber -= minutes * minute
  }

  const seconds = Math.trunc(timeNumber / second)
  if (seconds !== 0) {
    time.push(`${seconds}s`)
    timeNumber -= seconds * second
  }
  return time.join(' ');
}

export function fromTimeToNumber(time: string): number {
  let timeNumber = 0
  const parts = time.split(' ')
  parts.forEach(part => {
    const name = part.at(-1)
    const count = part.slice(0, -1)
    switch (name) {
      case 'd':
        timeNumber+= day * +count
        break
      case 'h':
        timeNumber+= hour * +count
        break
      case 'm':
        timeNumber+= minute * +count
        break
      case 's':
        timeNumber+= second * +count
        break
      default:
        break
    }
  })
  return timeNumber
}

export function isTimeValid(time: string): boolean {
  time = time.trim()
  let isValid = true
  const parts = time.split(' ')
  parts.forEach(part => {
    const name = part.at(-1)
    const count = part.slice(0, -1)
    if (!names.includes(name as string) || !(/^\d+$/.test(count))) {
      isValid = false
    }
  })
  return isValid
}

export function date(number: number | Date): string {
  const date = new Date(number)
  const d = date.getDate();
  const mo = date.getMonth() + 1;
  const y = date.getFullYear();
  const h = date.getHours();
  const m = date.getMinutes();

  return `${d < 10 ? '0' + d : d }/${mo < 10 ? '0' + mo : mo }/${y} ${h < 10 ? '0' + h : h }:${m < 10 ? '0' + m : m }`
}