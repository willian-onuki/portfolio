'use client'
import React from "react";
import { PhoneIcon, MapPinIcon, EnvelopeIcon } from "@heroicons/react/24/solid";
import { useForm } from 'react-hook-form';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactMe() {
  const {register, handleSubmit, watch, formState: {errors}} = useForm<FormData>()

  const handleForm = (data: FormData) => {
    window.location.href = `mailto:willianonuki1@gmail?subject=${data.subject}&body=Hi, my name is ${data.name}. ${data.message} (${data.email})`
  }

  return (
    <div className="relative text-primary-500 min-h-screen flex flex-col items-center text-center max-w-7xl px-10 justify-evenly mx-auto md:text-left md:flex-row">
      <h3 className="absolute top-20 tracking-[20px] text-2xl uppercase">
        Contact Me
      </h3>

      <div className="flex flex-col space-y-5">
        <h4 className="font-semibold text-4xl text-center">
          I have got just what you need.{" "}
          <span className="underline decoration-primary-500/50">Lets Talk</span>
        </h4>

        <div className="space-y-5">
          <div className="flex flex-row items-center justify-center space-x-5">
            <PhoneIcon className="w-7 h-7 animate-pulse" />
            <p className="text-primary-100">+55 43 99627-5754</p>
          </div>
          <div className="flex flex-row items-center justify-center space-x-5">
            <EnvelopeIcon className="w-7 h-7 animate-pulse" />
            <p className="text-primary-100">willianonuki1@gmail.com</p>
          </div>
          <div className="flex flex-row items-center justify-center space-x-5">
            <MapPinIcon className="w-7 h-7 animate-pulse" />
            <p className="text-primary-100">Cornélio Procópio - PR</p>
          </div>
        </div>

        <form className="flex flex-col space-y-2 w-fit mx-auto" onSubmit={
          handleSubmit(handleForm)
        }>
          <div className='flex space-x-2 max-sm:flex-col max-sm:space-x-0 max-sm:space-y-2'>
            <input  {...register('name')} className='contactInput' type="text" placeholder='Name' />
            <input {...register('email')} className='contactInput' type="text" placeholder='Email' />
          </div>

          <input {...register('subject')} className='contactInput' type="text" placeholder='Subject' />
          <textarea {...register('message')} className='contactInput' placeholder='Message'/>
          <button className='bg-primary-500  text-shape-500 py-3 px-5 rounded-md font-bold text-lg' type='submit'>Submit</button>
        </form>
      </div>
    </div>
  );
}
