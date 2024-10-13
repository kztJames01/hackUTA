'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import CustomInput from '@/components/CustomInput'
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,

} from "@/components/ui/form"

import { authFormSchema } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { getLoggedInUser, signIn, signUp } from '@/lib/actions/user.actions'
import { useRouter } from 'next/navigation'

const AuthForm = ({ type }: { type: string }) => {
    const [user, setUser] = useState(null);
    const router = useRouter();
    const formSchema = authFormSchema(type);
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: '',
        }
    })

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setLoading(true);
        try {
            if (type === 'sign-up') {
                const userData = {
                    firstName: data.firstName!,
                    lastName: data.lastName!,
                    city: data.city!,
                    state: data.state!,
                    postalCode: data.postalCode!,
                    phone: data.phone!,
                    email: data.email,
                    password: data.password,
                }
                await signUp(userData);
                router.push('/sign-in');

            }
            if (type === 'sign-in') {
                const response = await signIn({
                    email: data.email,
                    password: data.password
                })
                if (response) {
                    const cookieHeader = document.cookie; // Simulating getting cookies on the client-side
                    const loggedInUser = await getLoggedInUser(cookieHeader); // Pass the cookie header
                    setUser(loggedInUser);
                    router.push('/');
                }
            }
        }
        catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
    return (
        <section className='auth-form'>
            <header className='flex flex-col gap-5 md:gap-8'>
                <Link href='/' className='flex mb-12  cursor-pointer items-center gap-2'>
                    <Image src="/icons/logo.svg" width={34} height={34} alt="NxtGen logo" className="size=[24px] max-xl:size-14" />
                    <h1 className=' font-bold text-26 font-robo text-gray-900 px-4 '>Adopt Me</h1>
                </Link>
                <div className='flex flex-col gap-1 md:gap-3 '>
                    <h1 className='text-24 lg:text-36 font-semibold text-gray-700'>
                        {user ?
                            'Link Account' : type === 'sign-in' ? 'Sign In' : 'Sign Up'
                        }
                        <p className='text-16 font-normal text-gray-600'>
                            {user ?
                                'Link your account to get started' : 'Please enter your details'}
                        </p>
                    </h1>
                </div>
            </header>

            <>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        {type === 'sign-up' && (
                            <>
                                <div className='flex gap-4'>
                                    <CustomInput control={form.control} name="firstName" label="First Name" placeholder="Enter your first name" />
                                    <CustomInput control={form.control} name="lastName" label="Last Name" placeholder="Enter your last name" />
                                </div>

                                <CustomInput control={form.control} name="city" label="City" placeholder="Enter your city: New York" />
                                <CustomInput control={form.control} name="state" label="State" placeholder="Example: TX" />
                                <CustomInput control={form.control} name="postalCode" label="ZipCode" placeholder="Example: 11010" />
                                <CustomInput control={form.control} name="phone" label="Phone" placeholder="Example: 123-456-7890" />


                            </>
                        )}
                        <CustomInput control={form.control} name="email" label="Email" placeholder="Enter your email" />
                        <CustomInput control={form.control} name="password" label="Password" placeholder="Enter your password" />


                        <Button type="submit" disabled={loading} className="form-btn w-full">
                            {loading ?
                                <>
                                    <Loader2 size={20} className='animate-spin mr-3' /> &nbsp;
                                    Loading...
                                </>
                                : type === 'sign-in' ? 'Sign In' : 'Sign Up'}
                        </Button>

                    </form>
                </Form>
                <footer className="flex justify-center gap-1">
                    <p className='text-14 font-normal text-gray-600'>
                        {type === 'sign-in' ? 'Don’t have an account?' : 'Already have an account?'}
                    </p>
                    <Link href={type === 'sign-in' ? '/sign-up' : '/sign-in'} className='form-link'>
                        {type === 'sign-in' ? 'Sign Up' : 'Sign In'}
                    </Link>
                </footer>
            </>


        </section>
    )
}

export default AuthForm