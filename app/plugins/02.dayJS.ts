import dayjs from 'dayjs'

export default defineNuxtPlugin(() => {
  const date = (timestamp: number) => {
    return dayjs(timestamp).format('YYYY-MM-DD')
  }

  const dateTime = (timestamp: number) => {
    return dayjs(timestamp).format('YYYY-MM-DD  -  HH:mm:ss')
  }

  return {
    provide: {
      dayjs,
      date,
      dateTime
    }
  }
})
