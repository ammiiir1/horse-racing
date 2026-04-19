import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

export default defineNuxtPlugin(() => {
  dayjs.extend(duration)

  const date = (timestamp: number) => {
    return dayjs(timestamp).format('YYYY-MM-DD')
  }

  const time = (timestamp: number) => {
    return dayjs(timestamp).format('HH:mm:ss')
  }

  const dateTime = (timestamp: number) => {
    return dayjs(timestamp).format('YYYY-MM-DD  -  HH:mm:ss')
  }

  return {
    provide: {
      dayjs,
      date,
      time,
      dateTime
    }
  }
})
