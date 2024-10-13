import React, { useEffect } from 'react'
import TinderCard from 'react-tinder-card'
import { motion } from 'framer-motion'
import { BeatLoader } from 'react-spinners'

const swipedRight = []
const PetSwiper = () => {
  const [pets, setPets] = React.useState<{ [key: string]: string }[]>()
  const [currentIndex, setCurrentIndex] = React.useState(0)

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
          setPets(data)
          console.log(data)
          setCurrentIndex(0)
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
      <div className="select-none w-full flex flex-col items-center pt-5">
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
              className="w-[58vh] h-[90vh] bg-cover bg-center rounded-[20px]"
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
            <BeatLoader color="#00FF00" />
          </div>
        )}
      </div>
    </div>
  )
}

export default PetSwiper
