import React from 'react'
import TinderCard from 'react-tinder-card'

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

const PetSwiper = ({ firstName }: { firstName: string }) => {
  return (
    <div className="w-screen overflow-hidden relative h-screen">
      <div className="absolute top-0 left-0 right-0 z-10 bg-white bg-opacity-80 p-4 text-center">
        <h1 className="text-2xl font-bold">Welcome, {firstName}!</h1>
      </div>
      <div className="select-none w-full flex flex-col items-center pt-5">
        {people.map((person) => (
          <TinderCard
            className="absolute"
            key={person.name}
            preventSwipe={['up', 'down']}
            onSwipe={(dir) => console.log(dir)}
          >
            <div
              className="w-[58vh] h-[90vh] bg-cover rounded-lg"
              style={{ backgroundImage: `url(${person.url})` }}
            ></div>
            <div className="absolute bottom-0">
              <h3 className="text-2xl">{person.name}</h3>
            </div>
          </TinderCard>
        ))}
      </div>
    </div>
  )
}

export default PetSwiper
