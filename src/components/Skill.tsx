import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  directionLeft?: boolean;
}

export default function Skill ({directionLeft}: Props) {
  return(
    <div className='group relative flex cursor-pointer'>
      <motion.img
        initial={{
          x: directionLeft ? -200 : 200,
          opacity: 0
        }}
        whileInView={{
          x: 0,
          opacity: 1
        }}
        transition={{
          duration: 1
        }}
        src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg'
        className='rounded-full border-2 border-primary-1s00 object-cover w-20 h-20 xl:w-24 xl:h-24 filter group-hover:grayscale transition duration-300 ease-in-out'
      />
      <div className='absolute opacity-0 group-hover:opacity-80 transition duration-300 ease-in-out group-hover:bg-white/80 w-20 h-20 xl:w-24 xl:h-24 rounded-full z-0'>
        <div className='flex items-center justify-center h-full'>
          <p className='text-xl font-bold text-primary-500 opacity-100'>100%</p>
        </div>
      </div>
    </div>
  )
}