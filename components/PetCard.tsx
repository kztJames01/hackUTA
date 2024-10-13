import React from 'react'
import Image from 'next/image'
const PetCard = ({breed, sex, url}:PetProps) => {
  return (
    <section className='w-full px-4 py-2'>
        <div className='flex justify-center items-center'>
            <Image src={url} width={300} height={300} alt={breed} className='rounded-lg' />
            <div className='flex flex-col justify-between items-center'>
                <h3 className='text-2xl font-bold'>{breed}</h3>
                <p className='text-xl'>{sex}</p>
            </div>
        </div>
    </section> 
  )
}

export default PetCard