'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const welcomeMessage = [
  { type: 'text', data: 'Welcome to AdoptME' },
  {
    type: 'text',
    data: 'Before we get started, we need to ask you a few questions',
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
      question:
        'Thanks for your cooperation. Are you ready to find your next pet?',
      options: ["Yes. Let's start swiping"],
    },
  },
]

const ANIMATION_DURATION = 0.5

const Questions = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const router = useRouter()

  useEffect(() => {
    if (welcomeMessage[currentIndex]?.type === 'text') {
      const timer = setTimeout(() => {
        setCurrentIndex((prevIndex) => prevIndex + 1)
      }, 2300)

      return () => clearTimeout(timer)
    }

    if (currentIndex === welcomeMessage.length) {
      router.push('feed')
    }
  }, [currentIndex])

  return welcomeMessage.map((message, index) => {
    if (message.type === 'text') {
      return (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: currentIndex === index ? 1 : 0 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: ANIMATION_DURATION,
            delay: currentIndex === index ? ANIMATION_DURATION : 0,
          }}
          className={`absolute text-center container text-16 font-normal text-gray-600 ${
            currentIndex === index ? '' : 'pointer-events-none'
          }`}
        >
          {message.data}
        </motion.div>
      )
    }
    if (message.type === 'mcq') {
      return (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: currentIndex === index ? 1 : 0 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: ANIMATION_DURATION,
            delay: currentIndex === index ? ANIMATION_DURATION : 0,
          }}
          className={`absolute text-center container text-16 font-normal text-gray-600 ${
            currentIndex === index ? '' : 'pointer-events-none'
          }`}
        >
          <h1>{message.data.question}</h1>
          <div className="flex flex-col gap-1 pt-5">
            {message.data.options.map((option, index) => (
              <button
                onClick={() => setCurrentIndex((prevIndex) => prevIndex + 1)}
                key={index}
                className="border border-black-1 p-2 rounded-[16px] m-2 hover:bg-green-200 active:bg-green-300"
              >
                {option}
              </button>
            ))}
          </div>
        </motion.div>
      )
    }
  })
}

export default Questions
