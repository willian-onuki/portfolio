'use client'
import React from 'react'
import { Cursor, useTypewriter } from 'react-simple-typewriter'
import BackgroundCircles from './BackgroundCircles'

export default function Hero() {
  const [text, count] = useTypewriter({
    words: ["Hi, The Name's Willian", "Guy-Who-Loves-Coffee.tsx", "<ButLovesToCodeMore />"],
    loop: true,
    delaySpeed: 2000,
  })

  return (
    <div className='flex flex-col space-y-8 items-center justify-center text-center h-screen overflow-hidden'>
      <BackgroundCircles />
      <img className='relative rounded-full w-32 h-32 object-cover mx-auto' src='https://avatars.githubusercontent.com/u/65553634?s=400&u=ea5273341efd0e3cf2421e099e96a40945890211&v=4' alt='profile image' />
      <div className='z-20'>
        <h2 className='text-sm uppercase text-primary-100 pb-2 tracking-[15px]'>Front End Developer</h2>
        <h1 className='text-5xl lg:text-6xl font-semibold px-10'>
          <span className='mr-3'>{text}</span>
          <Cursor cursorColor='#23455F' />
        </h1>

        <div className='pt-5'>
          <a href='#about' >
            <button className='heroButton'>About</button>
          </a>
          <a href='#experiences'>
            <button className='heroButton'>Experience</button>
          </a>
          <a href='#skills'>
            <button className='heroButton'>Skills</button>
          </a>
          <a href='#projects'>
            <button className='heroButton'>Projects</button>
          </a>
        </div>
      </div>
    </div>
  )
}