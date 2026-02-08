"use client"

import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useCallback, useMemo, useState } from 'react'

const people = [
  {
    name: 'Richard Hendricks',
    url: 'https://placehold.co/300x300',
  },
  {
    name: 'Richard Hendrick',
    url: 'https://placehold.co/300x300',
  },
]

const SWIPE_THRESHOLD = 140

type Person = {
  name: string
  url: string
}

const PetSwiper = () => {
  const [cards, setCards] = useState<Person[]>(people)

  const handleSwipe = useCallback((name: string) => {
    setCards((prev) => prev.filter((person) => person.name !== name))
  }, [])

  const stackedCards = useMemo(() => [...cards].reverse(), [cards])

  return (
    <div className="w-screen overflow-hidden relative h-screen">
      <div>AdoptMe</div>
      <div className="select-none w-full flex flex-col items-center pt-5">
        {stackedCards.map((person, index) => (
          <SwipeCard
            key={person.name}
            person={person}
            isTop={index === stackedCards.length - 1}
            onSwiped={() => handleSwipe(person.name)}
          />
        ))}
      </div>
    </div>
  )
}

type SwipeCardProps = {
  person: Person
  isTop: boolean
  onSwiped: () => void
}

const SwipeCard = ({ person, isTop, onSwiped }: SwipeCardProps) => {
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-250, 0, 250], [-10, 0, 10])
  const opacity = useTransform(x, [-250, 0, 250], [0.6, 1, 0.6])

  return (
    <motion.div
      className="absolute"
      drag={isTop ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.35}
      onDragEnd={(_, info) => {
        if (Math.abs(info.offset.x) > SWIPE_THRESHOLD) {
          onSwiped()
        }
      }}
      style={{ x, rotate, opacity }}
      whileTap={{ scale: 0.98 }}
    >
      <div
        className="w-[58vh] h-[90vh] bg-cover rounded-lg"
        style={{ backgroundImage: `url(${person.url})` }}
      ></div>
      <div className="absolute bottom-0">
        <h3 className="text-2xl">{person.name}</h3>
      </div>
    </motion.div>
  )
}

export default PetSwiper