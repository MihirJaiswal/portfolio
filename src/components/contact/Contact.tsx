"use client"
import type React from "react"
import { useState } from "react"
import { z } from "zod"
import { MorphingBlob } from "../../components/ui/morphing-blob"

// Validation schema
const contactSchema = z.object({
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
  phone: z.string()
    .optional()
    .refine((val) => !val || /^[\+]?[0-9\s\-\(\)]{10,15}$/.test(val), {
      message: "Please enter a valid phone number"
    }),
  email: z.string()
    .email("Please enter a valid email address")
    .max(100, "Email must be less than 100 characters"),
  message: z.string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be less than 1000 characters")
})

type ContactFormData = z.infer<typeof contactSchema>

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    phone: "",
    email: "",
    message: "",
  })
  
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    
    // Clear error for this field when user starts typing
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const validateField = (name: keyof ContactFormData, value: string) => {
    try {
      contactSchema.shape[name].parse(value)
      return null
    } catch (error) {
      if (error instanceof z.ZodError) {
        return error.issues[0].message
      }
      return "Invalid input"
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    const error = validateField(name as keyof ContactFormData, value)
    if (error) {
      setErrors((prev) => ({ ...prev, [name]: error }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: '' })
    setErrors({})

    // Validate all fields
    try {
      const validatedData = contactSchema.parse(formData)
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validatedData),
      })

      const result = await response.json()

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: 'Thank you! Your message has been sent successfully.'
        })
        // Reset form
        setFormData({
          name: "",
          phone: "",
          email: "",
          message: "",
        })
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.error || 'Something went wrong. Please try again.'
        })
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Set field-specific errors
        const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {}
        error.issues.forEach((issue) => {
          if (issue.path[0]) {
            fieldErrors[issue.path[0] as keyof ContactFormData] = issue.message
          }
        })
        setErrors(fieldErrors)
        setSubmitStatus({
          type: 'error',
          message: 'Please fix the errors below and try again.'
        })
      } else {
        setSubmitStatus({
          type: 'error',
          message: 'Network error. Please check your connection and try again.'
        })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
   <div className="px-6 py-20 border-t-2 border-neutral-600 dark:border-neutral-800 relative" id="contact">
     <div className="w-full max-w-7xl mx-auto">
      <h2 className="text-neutral-600 font-medium mb-8">GET IN TOUCH</h2>

      {/* Status Messages */}
      {submitStatus.type && (
        <div className={`mb-6 p-4 rounded-md ${
          submitStatus.type === 'success' 
            ? 'bg-green-50 text-green-700 border border-green-200' 
            : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          {submitStatus.message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid gap-10">
          <div className="grid grid-cols-1 md:grid-cols-[250px,1fr] items-center">
            <label htmlFor="name" className="text-3xl md:text-4xl font-extrabold uppercase tracking-tighter">
              MY NAME IS
            </label>
            <div className="w-full">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Your name"
                required
                disabled={isSubmitting}
                className={`border-0 border-b ${
                  errors.name 
                    ? 'border-red-500 focus:border-red-600' 
                    : 'border-neutral-300 focus:border-neutral-600'
                } focus:ring-0 focus:outline-none px-0 py-2 bg-transparent w-full autofill:bg-transparent autofill:shadow-[inset_0_0_0px_1000px_transparent] disabled:opacity-50`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[250px,1fr] items-center">
            <label htmlFor="phone" className="text-3xl md:text-4xl font-extrabold uppercase tracking-tighter">
              PHONE NO
            </label>
            <div className="w-full">
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="+91 900 800 900"
                disabled={isSubmitting}
                className={`border-0 border-b ${
                  errors.phone 
                    ? 'border-red-500 focus:border-red-600' 
                    : 'border-neutral-300 focus:border-neutral-600'
                } focus:ring-0 focus:outline-none px-0 py-2 bg-transparent w-full autofill:bg-transparent autofill:shadow-[inset_0_0_0px_1000px_transparent] disabled:opacity-50`}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[250px,1fr] items-center">
            <label htmlFor="email" className="text-3xl md:text-4xl font-black uppercase tracking-tighter">
              EMAIL ME @
            </label>
            <div className="w-full">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="your.email@example.com"
                required
                disabled={isSubmitting}
                className={`border-0 border-b ${
                  errors.email 
                    ? 'border-red-500 focus:border-red-600' 
                    : 'border-neutral-300 focus:border-neutral-600'
                } focus:ring-0 focus:outline-none px-0 py-2 bg-transparent w-full disabled:opacity-50`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[250px,1fr] items-start">
            <label htmlFor="message" className="text-3xl md:text-4xl font-black uppercase tracking-tighter">
              I&apos;D LIKE TO SAY
            </label>
            <div className="w-full">
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Your message"
                rows={3}
                required
                disabled={isSubmitting}
                className={`border-0 border-b ${
                  errors.message 
                    ? 'border-red-500 focus:border-red-600' 
                    : 'border-neutral-300 focus:border-neutral-600'
                } focus:ring-0 focus:outline-none px-0 py-2 bg-transparent w-full resize-none disabled:opacity-50`}
              />
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">{errors.message}</p>
              )}
              <div className="text-xs text-neutral-400 mt-1">
                {formData.message.length}/1000 characters
              </div>
            </div>
          </div>

          <div className="lg:flex justify-end absolute top-[550px] right-24 hidden">
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
              disabled={isSubmitting}
              className="text-white font-medium rounded-full w-24 h-24 flex items-center justify-center transition-colors focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'SENDING...' : 'SUBMIT'}
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
              disabled={isSubmitting}
              className="text-white font-medium rounded-full w-24 h-24 flex items-center justify-center transition-colors focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'SENDING...' : 'SUBMIT'}
            </button>
            </MorphingBlob>
          </div>
        </div>
      </form>
    </div>
   </div>
  )
}