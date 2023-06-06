'use client'
import React from 'react'
import { SocialIcon } from 'react-social-icons'
import { motion } from 'framer-motion'

export default function Header() {
  return (
    <header className='sticky top-0 p-5 flex flex-row items-start justify-between max-w-7xl mx-auto z-20 xl:items-center'>
      <motion.div
        initial={{
          x: -500,
          opacity: 0,
          scale: 0.5
        }}
        animate={{
          x: 0,
          opacity: 1,
          scale: 1
        }}
        transition={{
          duration: 1.5
        }}
      >
        <SocialIcon url='https://github.com/willian-onuki' bgColor='transparent' fgColor='#23455F' />
        <SocialIcon url='https://www.linkedin.com/in/willian-onuki-313691206/' bgColor='transparent' fgColor='#23455F' />
      </motion.div>
      <motion.div
        className='flex flex-row items-center cursor-pointer'
        initial={{
          x: 500,
          opacity: 0,
          scale: 0.5
        }}
        animate={{
          x: 0,
          opacity: 1,
          scale: 1
        }}
        transition={{
          duration: 1.5
        }}
      >
        <SocialIcon network='email' bgColor='transparent' fgColor='#23455F' />
        <p className='uppercase hidden text-sm md:inline-block text-primary-500'>get in touch</p>
      </motion.div>
    </header>
  )
}