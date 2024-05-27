'use client'

import React from 'react'
import CountUp from 'react-countup'

const AnimatedCount = ({ amount }: { amount: number }) => {
  return (
    <div className='w-full'>
      <CountUp
        end={amount}
        decimal='.'
        prefix='$'
        duration={2}
        decimals={2}
      />
    </div>
  )
}

export default AnimatedCount
