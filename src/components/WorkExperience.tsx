"use client";
import React from "react";
import { motion } from "framer-motion";
import ExperienceCard from "./ExperienceCard";
import { getExperiences } from '@/utils/getExperiences';

export default function WorkExperience() {

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      transition={{
        duration: 1.5,
      }}
      whileInView={{
        opacity: 1,
      }}
      className="relative h-screen flex flex-col items-center overflow-hidden text-left md:flex-row max-w-full px-10 justify-evenly mx-auto"
    >
      <h3 className="absolute top-20 tracking-[20px] uppercase   text-primary-500 text-2xl">
        Experiences
      </h3>

      <div className="w-full flex space-x-5 overflow-x-scroll p-10 snap-x snap-mandatory mt-28 scrollbar scrollbar-track-[#CBD2CC]/10 scrollbar-thumb-primary-100/80">
        {getExperiences.map((experience, index) => (
        <ExperienceCard key={index} experience={experience}/>
        ))}
      </div>
    </motion.div>
  );
}
