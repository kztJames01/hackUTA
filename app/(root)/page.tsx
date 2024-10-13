
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import ContactForm from '@/components/ContactForm'
import { Button } from '@/components/ui/button'
const Home = () => {

    return (
        <section>
            <div className='flex-center w-full --font-robo'>
                <div className="flex justify-center items-center relative min-h-screen">
                    <nav className='absolute top-0 right-0'>
                        <Button className='nav-button box-shadow-form'>Get Started</Button>
                    </nav>
                    <div className='bg-transparent absolute '>
                        <h1 className='text-6xl text-center text-gray-200 font-bold'>Adopt Me</h1>
                    </div>
                    <Image src="/dog.jpg" width={5000} height={5000} alt="bg-img" />
                    <Button className='absolute bottom-20 right-20 rounded-xl bg-gray-700  py-3'>
                        <Image src="/icons/arrow-down.svg" width={10} height={15} alt="plus" />
                    </Button>
                </div>

            </div>
            <section className='px-6 py-8 w-full min-h-screen' >
                <div className='home-content'>
                    <h1 className='text-3xl font-bold'>Details....</h1>
                    <p className='text-12 font-normal text-gray-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </p>
                    <Image src="/dog.jpg" width={500} height={500} alt="plus" />
                </div>
            </section>
            <footer className='px-6 py-12 w-full bg-gray-100 text-gray-800 min-h-screen'>
                <h1 className='text-4xl font-bold text-center py-6'>Contact Us</h1>
                <section className='w-full max-w-4xl mx-auto flex flex-col items-center justify-center gap-4'>
                    <ContactForm />
                </section>
                <div className='text-center mt-8'>
                    <p className='text-lg'>Follow us on social media:</p>
                    <div className='flex justify-center gap-6 mt-4'>
                        <a href="#" className='text-blue-500 hover:underline'>
                            <svg className='w-6 h-6' fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13.5v5.25h-3v-5.25h3zm1 0h3v3h-3zm0 5.25v6.75h3v-6.75h-3z" /></svg>
                        </a>
                        <a href="#" className='text-blue-500 hover:underline'>
                            <svg className='w-6 h-6' fill="currentColor" viewBox="0 0 24 24"><path d="M22.23 5.924c-.77.344-1.6.573-2.47.676.89-.534 1.57-1.38 1.9-2.4-.83.49-1.75.84-2.73 1.03a4.91 4.91 0 0 0-8.36 4.48c-4.07-.2-7.69-2.16-10.11-5.12-.42.72-.66 1.56-.66 2.45 0 1.69.86 3.18 2.17 4.05-.8-.03-1.56-.25-2.23-.61v.06c0 2.36 1.68 4.32 3.91 4.77-.41.11-.84.17-1.28.17-.31 0-.62-.03-.92-.09.62 1.93 2.44 3.34 4.58 3.38A9.84 9.84 0 0 1 1.5 20c-.39 0-.77-.02-1.15-.07 2.16 1.39 4.73 2.2 7.46 2.2 8.94 0 13.84-7.4 13.84-13.79 0-.21 0-.42-.02-.62.95-.68 1.77-1.52 2.43-2.48z" /></svg>
                        </a>
                        <a href="#" className='text-blue-500 hover:underline'>
                            <svg className='w-6 h-6' fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm-2.5 17.5V13H8v-3h1.5V8.5c0-1.5.92-2.5 2.26-2.5H13v3h-1.5c-.25 0-.5.25-.5.5v1.5h2.5l-.5 3h-2v6.5h-3z" /></svg>
                        </a>
                    </div>
                    <p className='mt-6'>© {new Date().getFullYear()} Your Company. All rights reserved.</p>
                </div>
            </footer>


        </section>
    )
}

export default Home