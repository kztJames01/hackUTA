import React, { useState } from 'react'

import PetCard from './PetCard'
import { ChevronDown, ChevronUp } from 'lucide-react'

const RightSideBar = ({ user, pets }: RightSidebarProps) => {
  const [showMore, setShowMore] = useState(false)

  const toggleShowMore = () => setShowMore(!showMore)

  return (
    <aside className="right-sidebar bg-gray-100 p-4 rounded-lg shadow-md">
      <section className='flex flex-col pb-8'>
        <div className='profile-banner h-24 bg-gradient-to-r from-blue-400 to-purple-500 rounded-t-lg'></div>
        <div className='profile -mt-12 flex flex-col items-center'>
          <div className='profile-img w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-lg'>
            <span className='text-5xl font-bold font-robo text-gray-900'>{user?.firstName[0]}</span>
          </div>
          <div className='profile-details mt-4 text-center'>
            <h1 className='profile-name text-2xl font-semibold'>{user?.firstName} {user?.lastName}</h1>
            <p className='profile-email text-gray-600'>{user?.email}</p>
          </div>
        </div>
      </section>

      <section className='pets mt-8'>
        <div className='flex w-full justify-between items-center mb-4'>
          <h2 className='header-2 text-xl font-semibold'>Saved Pets</h2>
          <div className='bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm'>
            {pets?.length || 0} pets
          </div>
        </div>
        {pets && pets.length > 0 && (
          <div className='relative'>
            <div className='pet-card-stack space-y-4'>
              {pets.slice(0, showMore ? pets.length : 3).map((pet, index) => (
                <div key={index} className={`transform transition-all duration-300 ${index > 0 ? '-mt-32' : ''} hover:-translate-y-2 hover:shadow-lg`}>
                  <PetCard breed={pet.breed} url={pet.url} sex={pet.sex} />
                </div>
              ))}
            </div>
            {pets.length > 3 && (
              <button
                onClick={toggleShowMore}
                className='mt-4 w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg flex items-center justify-center transition-colors duration-300'
              >
                {showMore ? (
                  <>
                    <ChevronUp className="mr-2" />
                    Show Less
                  </>
                ) : (
                  <>
                    <ChevronDown className="mr-2" />
                    Show More ({pets.length - 3} more)
                  </>
                )}
              </button>
            )}
          </div>
        )}
        {(!pets || pets.length === 0) && (
          <div className='text-center py-8 text-gray-500'>
            No saved pets yet. Start exploring to find your perfect companion!
          </div>
        )}
      </section>
    </aside>
  )
}

export default RightSideBar