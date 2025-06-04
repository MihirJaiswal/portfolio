"use client"
import type React from "react"

import { useState } from "react"
import { MorphingBlob } from "../components/ui/morphing-blob"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
   <div className="px-6 pt-12 border-t-2 border-neutral-600 dark:border-neutral-800 relative">
     <div className="w-full max-w-7xl mx-auto">
      <h2 className="text-neutral-600 font-medium mb-8">GET IN TOUCH</h2>

      <form 
        action="https://formsubmit.co/jaiswalmihir.business@gmail.com"
        method="POST"
      >
        {/* Hidden FormSubmit configuration fields */}
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_subject" value="Portfolio Contact Form" />
        
        <div className="grid gap-10">
          <div className="grid grid-cols-1 md:grid-cols-[250px,1fr] items-center">
            <label htmlFor="name" className="text-3xl md:text-4xl font-black uppercase tracking-tighter">
              MY NAME IS
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              required
              className="border-0 border-b border-neutral-300 focus:border-neutral-600 focus:ring-0 focus:outline-none px-0 py-2 bg-transparent w-full autofill:bg-transparent autofill:shadow-[inset_0_0_0px_1000px_transparent]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[250px,1fr] items-center">
            <label htmlFor="phone" className="text-3xl md:text-4xl font-black uppercase tracking-tighter">
              PHONE NO
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 900 800 900"
              className="border-0 border-b border-neutral-300 focus:border-neutral-600 focus:ring-0 focus:outline-none px-0 py-2 bg-transparent w-full autofill:bg-transparent autofill:shadow-[inset_0_0_0px_1000px_transparent]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[250px,1fr] items-center">
            <label htmlFor="email" className="text-3xl md:text-4xl font-black uppercase tracking-tighter">
              EMAIL ME @
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              required
              className="border-0 border-b border-neutral-300 focus:border-neutral-600 focus:ring-0 focus:outline-none px-0 py-2 bg-transparent w-full"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[250px,1fr] items-start">
            <label htmlFor="message" className="text-3xl md:text-4xl font-black uppercase tracking-tighter">
              I&apos;D LIKE TO SAY
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your message"
              rows={3}
              required
              className="border-0 border-b border-neutral-300 focus:border-neutral-600 focus:ring-0 focus:outline-none px-0 py-2 bg-transparent w-full resize-none"
            />
          </div>

          <div className="lg:flex justify-end mt-12 absolute bottom-6 right-24 hidden">
            <MorphingBlob
            theme="custom"
            customColors={{
              from: "#00000",
              via: "#000000",
              to: "#000000",
            }}
            size="sm"
            complexity={4}
            speed={2}
            glow={false}
            effect3D={true}
            hoverEffect={true}
            clickEffect={true}
            pulse={false}
            >
            <button
              type="submit"
              className="text-white font-medium rounded-full w-24 h-24 flex items-center justify-center transition-colors focus:outline-none"
            >
              SUBMIT
            </button>
            </MorphingBlob>
          </div>
           <div className="flex justify-end lg:hidden">
            <MorphingBlob
            theme="custom"
            customColors={{
              from: "#00000",
              via: "#000000",
              to: "#000000",
            }}
            size="sm"
            complexity={4}
            speed={2}
            glow={false}
            effect3D={true}
            hoverEffect={true}
            clickEffect={true}
            pulse={false}
            >
            <button
              type="submit"
              className="text-white font-medium rounded-full w-24 h-24 flex items-center justify-center transition-colors focus:outline-none"
            >
              SUBMIT
            </button>
            </MorphingBlob>
          </div>
        </div>
      </form>
    </div>
   </div>
  )
}