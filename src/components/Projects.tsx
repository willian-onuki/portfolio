'use client'
import React from 'react';
import {motion} from 'framer-motion';

export default function Projects () {
  const projects = [1,2,3,4,5]
  return(
    <div className='relative h-screen text-primary-500 overflow-hidden flex flex-col items-center text-left md:flex-row max-w-full justify-evenly mx-auto z-0'>
      <h3 className='absolute top-20 uppercase tracking-[20px] text-2xl'>Projects</h3>

      <div className='relative w-full flex overflow-x-scroll overflow-y-hidden snap-x snap-mandatory z-20 scrollbar scrollbar-track-[#CBD2CC]/10 scrollbar-thumb-primary-100/80'>
        {
          projects.map((project, index) => (
            <div key={index} className='h-screen w-screen flex flex-col items-center justify-center flex-shrink-0 space-y-5 p-4 snap-center md:p-44'>
              <motion.img
                initial={{
                  opacity: 0,
                  y: -300
                }}
                whileInView={{
                  opacity: 1,
                  y: 0
                }}
                transition={{
                  duration: 1.5
                }}
                viewport={{
                  once: true
                }}
                src="/rentx.png"
                className='w-68 h-56'
              />
              <div className='space-y-10 px-0 max-w-6xl md:px-10'>
                <h4 className='underline decoration-primary-500/50 text-3xl font-semibold text-center'>RentX Ignite - Offline First</h4>
                <p className='text-lg text-center md:text-left'>
                An application for renting vehicles, using Expo, React Native and TypeScript, React Navigation, Hooks, animations with react-native-reanimated and lottie-react-native were applied to animate headers, loading and splash screen. To handle data storage, JSON Server was used, and axios, to consume the API.
                </p>
              </div>
            </div>
          ))
        }
      </div>

      <div className='w-full absolute top-[25%] bg-primary-100/80 left-0 h-[500px] -skew-y-12'/>
    </div>
  )
}