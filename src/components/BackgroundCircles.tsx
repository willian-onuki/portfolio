import React from 'react'
import { motion } from 'framer-motion'

export default function BackgroundCircles() {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: [0.1, 0.2, 0.4, 0.8, 0.1, 1],
        scale: [1, 2, 2, 3, 1],
        borderRadius: ['20%', '20%', '50%', '80%', '20%']
      }}
      transition={{
        duration: 2.5
      }}
      className='flex justify-center relative items-center'
    >
      <div className='absolute border border-[#C6D4D5] rounded-full w-[200px] h-[200px] mt-52 animate-ping' />
      <div className='absolute border border-[#C6D4D5] rounded-full w-[300px] h-[300px] mt-52' />
      <div className='absolute border border-[#C6D4D5] rounded-full w-[500px] h-[500px] mt-52' />
      <div className='absolute border border-primary-500 rounded-full w-[650px] h-[650px] mt-52 animate-pulse' />
      <div className='absolute border border-[#C6D4D5] rounded-full w-[800px] h-[800px] mt-52' />
    </motion.div>
  )
}