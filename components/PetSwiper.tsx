'use client'

import React, { useEffect } from 'react'
import TinderCard from 'react-tinder-card'
import { motion, AnimatePresence } from 'framer-motion'
import { BsChatRightDots } from 'react-icons/bs'
import { BeatLoader } from 'react-spinners'
import Link from 'next/link'
import { IoMdClose } from 'react-icons/io'
import ReactIframe from 'react-iframe'
import Image from 'next/image'

const swipedRight: { [key: string]: string }[] = []
const PetSwiper = () => {
  const [pets, setPets] = React.useState<{ [key: string]: string }[]>()
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [openChat, setOpenChat] = React.useState(false)
  const [isGettingPersonalized, setIsGettingPersonalized] =
    React.useState(false)

  useEffect(() => {
    const fetchData = () => {
      fetch('http://localhost:5000/random_recommendation')
        .then((response) => response.json())
        .then((data) => {
          setPets(data)
          console.log(data)
        })
        .catch((error) => {
          console.error('Error fetching data:', error)
          setTimeout(fetchData, 5000) // Retry after 5 seconds
        })
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (pets && currentIndex >= pets.length) {
      setIsGettingPersonalized(true)
      fetch('http://localhost:5000/update_recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pets: swipedRight,
          userid: '7DDrvDU9bCX1p0adhq61HhkaFC63',
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setTimeout(() => {
            setPets(data)
            setCurrentIndex(0)
            setIsGettingPersonalized(false)
          }, 1000)
        })
        .catch((error) => {
          console.error('Error fetching data:', error)
          setCurrentIndex(0)
          setTimeout(() => {}, 5000) // Retry after 5 seconds
        })
    }
  }, [currentIndex])

  return (
    <div className="w-screen overflow-hidden relative h-screen">
      {openChat && (
        <ReactIframe
          url="http://localhost:8501/"
          width="100%"
          height="100%"
          id="myId"
          className="absolute z-50"
          display="initial"
          position="absolute"
        />
      )}
      <div
        onClick={() => {
          setOpenChat((prev) => !prev)
        }}
        className="cursor-pointer absolute z-50 right-10 bottom-10 w-[80px] h-[80px] bg-red-500 rounded-full flex items-center justify-center"
      >
        <AnimatePresence>
          {openChat ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <IoMdClose className="w-[52px] h-[52px] fill-white" />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <BsChatRightDots className="w-[38px] h-[38px] fill-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Link
        href="/"
        className="flex mb-12  cursor-pointer items-center gap-2 absolute left-5 top-5"
      >
        <Image
          src="/icons/logo.svg"
          width={34}
          height={34}
          alt="NxtGen logo"
          className="size=[24px] max-xl:size-14"
        />
        <h1 className=" font-bold text-26 font-robo text-gray-900 px-4 ">
          Furever Home
        </h1>
      </Link>
      <div className="select-none w-full flex flex-col items-center pt-20">
        {pets && currentIndex < pets.length ? (
          <TinderCard
            className={`absolute`}
            key={pets[currentIndex]['Pet name']}
            preventSwipe={['up', 'down']}
            onSwipe={(dir) => {
              if (dir === 'right') {
                swipedRight.push(pets[currentIndex])
              }
              setCurrentIndex(currentIndex + 1)
            }}
          >
            <motion.div
              className="shadow-black-1 shadow-lg w-[58vh] h-[80vh] bg-cover bg-center rounded-[20px]"
              style={{
                backgroundImage: `url(${pets[currentIndex]['URL Link']})`,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
            ></motion.div>
            <motion.div
              className="absolute bottom-0 w-full rounded-b-[20px] bg-gradient-to-t from-black-1 to-transparent p-5 pt-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
            >
              <h3 className="text-2xl font-bold text-white ">
                {pets[currentIndex]['Pet name'].replace(/^\*/, '').trim()}
                <span className="relative left-10 text-sm font-light opacity-90">
                  {pets[currentIndex]['Sex'] === 'S' ? 'Male' : 'Female'}
                </span>
              </h3>
              <h4 className="text-white font-inter pt-2">
                {pets[currentIndex]['Breed']
                  .toLowerCase()
                  .split(' ')
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ')}
              </h4>
            </motion.div>
          </TinderCard>
        ) : (
          <div className="flex justify-center items-center h-screen">
            {isGettingPersonalized ? (
              <div>Getting Personalized Pet Recommendations</div>
            ) : (
              ''
            )}
            <BeatLoader color="#00FF00" />
          </div>
        )}
      </div>
    </div>
  )
}

export default PetSwiper
