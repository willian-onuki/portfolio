'use client'
import React from "react";
import { motion } from "framer-motion";
import Skill from './Skill';
export default function Skills() {
  return (
    <motion.div 
    initial={{
      opacity: 0
    }}
    whileInView={{
      opacity: 1
    }}
    transition={{
      duration: 1.5
    }}
    className="relative min-h-screen text-primary-500 flex flex-col justify-center items-center text-center max-w-[2000px] mx-auto md:text-left xl:flex-row xl:px-10 xl:space-y-0"
    >
      <h3 className='absolute top-20 uppercase tracking-[20px] text-2xl
      '>Skills</h3>
      <h3 className='absolute top-32 uppercase tracking-[3px] text-sm
      '>Hover over a skill for currency proficiency</h3>

      <div className='grid grid-cols-4 gap-5'>
        <Skill/>
        <Skill/>
        <Skill/>
        <Skill/>
        <Skill/>
        <Skill/>
        <Skill/>
        <Skill/>
        <Skill/>
        <Skill/>
        <Skill/>
        <Skill/>
        <Skill/>
        <Skill/>
      </div>
    </motion.div>
  );
}
