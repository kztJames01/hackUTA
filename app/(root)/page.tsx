'use client'
import React from 'react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '../../components/ui/button';
import ContactForm from '../../components/ContactForm';
import { useRouter } from 'next/navigation';
import { sign } from 'crypto';
const Home = () => {
    const [scrolling, setScrolling] = useState(false);
    const [fadeIn, setFadeIn] = useState(true);
    const router = useRouter();
    const handleScrollEvent = () => {
        const isUserScrolling = window.scrollY > 50;
        setScrolling(isUserScrolling);
        setFadeIn(!isUserScrolling);
    };
    useEffect(() => {
        window.addEventListener('scroll', handleScrollEvent);
        return () => {
            window.removeEventListener('scroll', handleScrollEvent);
        };
    }, []);
    const onClick =() => {
        setFadeIn(false);
        router.push('/sign-in');
    }
    return (
        <section className='font-inter'>
            <div className={`flex-center w-full`}>
                <div className="flex justify-center items-center relative min-h-screen">
                    <nav className={`absolute top-0 right-0 transition-all ${scrolling ? 'glassmorphism' : 'bg-transparent'}`}>
                        <Button className='nav-button'>Get Started</Button>
                    </nav>
                    <div className={`bg-transparent absolute transition-opacity ${fadeIn ? 'opacity-100' : 'opacity-10'}`}>
                        <h1 className='text-6xl text-center text-gray-200 font-bold'>Adopt Me</h1>
                    </div>
                    <Image src="/dog.jpg" width={5000} height={5000} alt="bg-img" />
                    <Button onClick={onClick} className='absolute bottom-20 right-20 rounded-xl bg-gray-700 py-3 hover:bg-bank-gradient'>
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
                        <a href="#" className='text-black'>
                            <Image src="/icons/logo-facebook.svg" width={20} height={20} alt="facebook" />
                        </a>
                        <a href="#" className='text-black'>
                            <Image src="/icons/logo-twitter.svg" width={20} height={20} alt="twitter" />
                        </a>
                        <a href="#" className='text-black'>
                            <Image src="/icons/logo-instagram.svg" width={20} height={20} alt="instagram" />
                        </a>
                    </div>
                    <p className='mt-6'>© {new Date().getFullYear()} Your Company. All rights reserved.</p>
                </div>
            </footer>


        </section>
    )
}

export default Home