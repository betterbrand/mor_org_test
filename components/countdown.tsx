import { Flex } from '@chakra-ui/react'
import dayjs, { type Dayjs } from 'dayjs'
import duration from 'dayjs/plugin/duration'
import React, { useEffect, useState } from 'react'

dayjs.extend(duration)

interface CountdownProps {
  endTime: Dayjs
  beforeLabel: JSX.Element
  afterLabel: JSX.Element
  endComponent: JSX.Element
}

export const Countdown: React.FC<CountdownProps> = ({
  endTime,
  beforeLabel,
  afterLabel,
  endComponent,
}) => {
  const [time, setTime] = useState<string | null>('')
  const [isEnd, setIsEnd] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = dayjs()
      const diffTime = endTime.diff(currentTime)

      if (diffTime <= 0) {
        clearInterval(interval)
        setTime(null)
        setIsEnd(true)
        return
      }

      const duration = dayjs.duration(diffTime)
      const days = Math.floor(duration.asDays())
      const hours = duration.hours()
      const minutes = duration.minutes()
      const seconds = duration.seconds()

      setTime(
        `${days < 10 ? 0 + days : days}d ${hours < 10 ? `0${hours}` : `${hours}`}h ${
          minutes < 10 ? `0${minutes}` : `${minutes}`
        }m ${seconds < 10 ? `0${seconds}` : seconds}s`,
      )
    }, 1000)

    return () => clearInterval(interval)
  }, [afterLabel, endTime])

  if (isEnd) {
    return (
      <Flex color='background.surface.base' fontWeight='medium'>
        {endComponent}
      </Flex>
    )
  }

  return (
    <Flex
      width='full'
      color='background.surface.base'
      fontWeight='medium'
      gap={2}
      justifyContent={{ base: 'space-between', md: 'center' }}
    >
      <Flex gap={{ base: 0, md: 1 }} flexDir={{ base: 'column', md: 'row' }}>
        {beforeLabel} {time}
      </Flex>
      {afterLabel}
    </Flex>
  )
}
