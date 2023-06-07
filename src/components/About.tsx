'use client'
import React from 'react'
import {motion} from 'framer-motion'
export default function About() {
  return (
    <motion.div
    initial={{
      opacity: 0
    }}
    transition={{
      duration: 1.5
    }}
    whileInView={{
      opacity: 1
    }}
    className="relative h-screen flex flex-col text-center md:text-left md:flex-row max-w-7xl px-10 justify-evenly mx-auto items-center">
      <h3 className='absolute top-20 tracking-[20px] uppercase text-primary-500 text-2xl'>About</h3>
      <motion.img 
        src='https://avatars.githubusercontent.com/u/65553634?s=400&u=ea5273341efd0e3cf2421e099e96a40945890211&v=4'
        initial={{
          opacity: 0,
          x: -200
        }}
        transition={{
          duration: 1.2
        }}
        whileInView={{
          opacity: 1,
          x: 0
        }}
        viewport={{once: true}}
        className='mt-24 md:mt-0 flex-shrink-0 w-36 h-36 rounded-full object-cover md:rounded-lg md:w-64 md:h-96 xl:w-[300px] xl:h-[500px]'
      />
      <div className='space-y-10 px-0 md:px-10'>
        <h4 className='text-4xl font-semibold text-primary-500'>Here is a <span className='underline decoration-primary-500/40'>little</span> background</h4>
        <p className='text-base'>
        Hello, I am a frontend developer with over 2 years of experience in creating user-friendly and responsive applications using React, React Native, TypeScript, and Git. My goal is to create modern and scalable applications that provide the best user experience.

        My skills include expertise in developing mobile and web applications using React and React Native, advanced knowledge of TypeScript to ensure safer and more scalable code, proficiency in using Git for version control and collaboration in team projects.

        I am always looking for new opportunities to grow and develop as a developer, and I am open to new challenges in ambitious and innovative projects.
        </p>
      </div>
    </motion.div>
  );
}
