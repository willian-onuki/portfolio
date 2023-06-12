import React from "react";
import { motion } from "framer-motion";

interface Experience {
  image: string;
  role: string;
  company: string;
  skills: string[];
  date: string;
  list: string[];
}

interface Props {
  experience: Experience;
}

export default function ExperienceCard({ experience }: Props) {

  return (
    <article className="text-primary-500 flex flex-col rounded-lg items-center space-y-7 flex-shrink-0 w-[500px] md:w-[600px] xl:w-[900px] snap-center bg-gray-200 p-10 opacity-40 hover:opacity-100 cursor-pointer transition-opacity duration-200 overflow-hidden h-[600px]">
      <motion.img
        src={experience.image}
        initial={{
          y: -100,
          opacity: 0,
        }}
        whileInView={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 1.2,
        }}
        viewport={{ once: true }}
        className="w-24 h-24 rounded-full md:rounded-lg xl:w-[150px] xl:h-[15~~px] object-cover object-center"
      />

      <div className="px-0 md:px-10">
        <h4 className="text-2xl font-light">{experience.role}</h4>
        <p className="text-xl font-bold mt-1">{experience.company}</p>
        <div className="flex space-x-2 my-2 justify-center items-center">
          {experience.skills.map((url, index) => (
            <img
              key={index}
              className="h-10 w-10 rounded-full"
              alt="Js"
              src={url}
            />
          ))}
        </div>
        <p className="uppercase py-2">{experience.date}</p>
      </div>
      <ul className="list-disc space-y-2 ml-5 text-base px-14">
        {experience.list.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </article>
  );
}
