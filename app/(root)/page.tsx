
import React from 'react'
import Image from 'next/image'
import ContactForm from '../../components/ContactForm'
import { Button } from '../../components/ui/button'

import { PageWrapper } from '../../components/PageWrapper'
import { Navbar } from '../../components/Navbar'


const Home = () => {
    return (


        <>
            <PageWrapper>
                <div className="relative">
                    <Navbar />
                    <header className="flex justify-center items-center relative min-h-screen w-full bg-green-100">
                        <div className='text-center'>
                            <h1 className='text-6xl font-bold text-green-700 mb-6 font-dancing'>Furever Home</h1>
                            <p className='text-xl text-green-600 mb-8'>Find your perfect furry companion today!</p>
                            <Button className='bg-brown-500 hover:bg-green-900 py-3 px-6 text-white rounded-xl'>
                                View Available Pets
                            </Button>
                        </div>
                        <Button className='absolute bottom-20 right-20 rounded-full bg-brown-500 hover:bg-green-900 p-3'>
                            <Image src="/icons/arrow-down.svg" width={20} height={20} alt="Scroll down" />
                        </Button>
                    </header>

                    <section className='px-6 py-16 bg-white'>
                        <div className='max-w-6xl mx-auto'>
                            <h2 className='text-4xl font-bold text-green-700 mb-8 text-center'>Why Adopt?</h2>
                            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                                <div className='text-center'>
                                    <Image src="/icons/heart.svg" width={64} height={64} alt="Love" className='mx-auto mb-4' />
                                    <h3 className='text-2xl font-semibold mb-2'>Save a Life</h3>
                                    <p>Give a loving home to an animal in need.</p>
                                </div>
                                <div className='text-center'>
                                    <Image src="/icons/paw.svg" width={64} height={64} alt="Paw" className='mx-auto mb-4' />
                                    <h3 className='text-2xl font-semibold mb-2'>Loyal Companion</h3>
                                    <p>Gain a faithful friend for life.</p>
                                </div>
                                <div className='text-center'>
                                    <Image src="/icons/home.svg" width={64} height={64} alt="Home" className='mx-auto mb-4' />
                                    <h3 className='text-2xl font-semibold mb-2'>Enrich Your Life</h3>
                                    <p>Experience the joy of pet ownership.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className='px-6 py-16 bg-green-50'>
                        <div className='max-w-6xl mx-auto'>
                            <h2 className='text-4xl font-bold text-green-700 mb-8 text-center'>Featured Pets</h2>
                            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className='bg-white rounded-lg shadow-md overflow-hidden'>
                                        <Image src={`/pets/pet${i}.jpg`} width={500} height={300} alt={`Pet ${i}`} className='w-full h-48 object-cover' />
                                        <div className='p-4'>
                                            <h3 className='text-xl font-semibold mb-2'>Pet Name {i}</h3>
                                            <p className='text-gray-600 mb-4'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                            <Button className='bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded'>
                                                Learn More
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    <footer className='px-6 py-12 bg-brown-500 text-white'>
                        <div className='max-w-6xl mx-auto'>
                            <h2 className='text-4xl font-bold text-center mb-8'>Contact Us</h2>
                            <div className='flex flex-col justify-center items-center gap-8'>
                                <div className='flex flex-col justify-center items-center gap-4'>
                                    <h3 className='text-2xl font-semibold mb-4'>Get in Touch</h3>
                                    <p className='mb-4'>Have questions about adoption? We're here to help!</p>
                                    <ContactForm />
                                </div>
                                <div className='flex flex-col justify-center items-center gap-4'>
                                    <h3 className='text-2xl font-semibold mb-4'>Visit Us</h3>
                                    <p className='mb-2'>123 Adoption Street</p>
                                    <p className='mb-2'>Petsville, PA 12345</p>
                                    <p className='mb-4'>Phone: (555) 123-4567</p>
                                    <div className='flex gap-4'>
                                        <a href="#" className='text-white hover:text-green-300'>
                                            <svg className='w-6 h-6' fill="currentColor" viewBox="0 0 24 24"><path d="M22.23 5.924c-.77.344-1.6.573-2.47.676.89-.534 1.57-1.38 1.9-2.4-.83.49-1.75.84-2.73 1.03a4.91 4.91 0 0 0-8.36 4.48c-4.07-.2-7.69-2.16-10.11-5.12-.42.72-.66 1.56-.66 2.45 0 1.69.86 3.18 2.17 4.05-.8-.03-1.56-.25-2.23-.61v.06c0 2.36 1.68 4.32 3.91 4.77-.41.11-.84.17-1.28.17-.31 0-.62-.03-.92-.09.62 1.93 2.44 3.34 4.58 3.38A9.84 9.84 0 0 1 1.5 20c-.39 0-.77-.02-1.15-.07 2.16 1.39 4.73 2.2 7.46 2.2 8.94 0 13.84-7.4 13.84-13.79 0-.21 0-.42-.02-.62.95-.68 1.77-1.52 2.43-2.48z" /></svg>
                                        </a>
                                        <a href="#" className='text-white hover:text-green-300'>
                                            <svg className='w-6 h-6' fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm-2.5 17.5V13H8v-3h1.5V8.5c0-1.5.92-2.5 2.26-2.5H13v3h-1.5c-.25 0-.5.25-.5.5v1.5h2.5l-.5 3h-2v6.5h-3z" /></svg>
                                        </a>
                                        <a href="#" className='text-white hover:text-green-300'>
                                            <svg className='w-6 h-6' fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm-2.5 17.5V13H8v-3h1.5V8.5c0-1.5.92-2.5 2.26-2.5H13v3h-1.5c-.25 0-.5.25-.5.5v1.5h2.5l-.5 3h-2v6.5h-3z" /></svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className='mt-8 text-center'>
                                <p>© {new Date().getFullYear()} Furever Home. All rights reserved.</p>
                            </div>
                        </div>
                    </footer>



                </div>

            </PageWrapper>
        </>




    )
}

export default Home

