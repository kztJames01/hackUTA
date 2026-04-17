'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import Image from 'next/image'

const welcomeMessage = [
  { type: 'text', data: 'Welcome to Furever Home 🐾' },
  {
    type: 'text',
    data: 'Before we get started, we need to ask you a few quick questions.',
  },
  {
    type: 'mcq',
    data: {
      question: 'Are you above 18 years of age?',
      options: ['Yes', 'No'],
    },
  },
  {
    type: 'mcq',
    data: {
      question: 'We\'ll show you 10 sample pets. Swipe right if you like them, left if not. This helps us learn your preferences.',
      options: ["Let's start swiping →"],
    },
  },
]

const ANIM = 0.4

const Questions = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const router = useRouter()

  useEffect(() => {
    if (welcomeMessage[currentIndex]?.type === 'text') {
      const timer = setTimeout(() => {
        setCurrentIndex((prev) => prev + 1)
      }, 2500)
      return () => clearTimeout(timer)
    }

    if (currentIndex === welcomeMessage.length) {
      router.push('feed')
    }
  }, [currentIndex])

  return (
    <div className="fixed inset-0 bg-hero-gradient flex items-center justify-center overflow-hidden">
      {/* dot pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="relative z-10 flex items-center justify-center w-full h-full px-6">
        <div className="absolute top-6 left-6 flex items-center gap-2">
          <Image src="/icons/logo.svg" width={26} height={26} alt="logo" />
          <span className="font-bold text-white font-robo text-lg">Furever Home</span>
        </div>

        {welcomeMessage.map((message, index) => {
          if (message.type === 'text') {
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: currentIndex === index ? 1 : 0, y: currentIndex === index ? 0 : 20 }}
                transition={{ duration: ANIM, delay: currentIndex === index ? ANIM : 0 }}
                className={`absolute text-center px-6 ${currentIndex === index ? '' : 'pointer-events-none'}`}
              >
                <p className="text-3xl sm:text-4xl font-semibold text-white max-w-lg leading-snug">
                  {typeof message.data === 'string' ? message.data : ''}
                </p>
              </motion.div>
            )
          }

          if (message.type === 'mcq') {
            const mcqData = typeof message.data === 'object' && 'question' in message.data
              ? message.data as { question: string; options: string[] }
              : null

            if (!mcqData) return null

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: currentIndex === index ? 1 : 0, y: currentIndex === index ? 0 : 20 }}
                transition={{ duration: ANIM, delay: currentIndex === index ? ANIM : 0 }}
                className={`absolute text-center max-w-lg px-6 ${currentIndex === index ? '' : 'pointer-events-none'}`}
              >
                <p className="text-xl sm:text-2xl font-medium text-white mb-8 leading-relaxed">
                  {mcqData.question}
                </p>
                <div className="flex flex-col gap-3">
                  {mcqData.options.map((option, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentIndex((prev) => prev + 1)}
                      className="bg-white/10 hover:bg-white/20 active:bg-white/30 border border-white/20 text-white font-medium py-3 px-8 rounded-full transition-colors text-base"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </motion.div>
            )
          }
        })}
      </div>
    </div>
  )
}

export default Questions
