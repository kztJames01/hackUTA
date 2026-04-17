'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import CustomInput from '@/components/CustomInput'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { authFormSchema } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { getLoggedInUser, signIn, signUp } from '@/lib/actions/user.actions'
import { useRouter } from 'next/navigation'

const AuthForm = ({ type }: { type: string }) => {
  const [user, setUser] = useState(null)
  const router = useRouter()
  const formSchema = authFormSchema(type)
  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true)
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
        await signUp(userData)
        router.push('/sign-in')
      }
      if (type === 'sign-in') {
        const response = await signIn({
          email: data.email,
          password: data.password,
        })
        if (response) {
          const cookieHeader = document.cookie
          const loggedInUser = await getLoggedInUser(cookieHeader)
          setUser(loggedInUser)
          router.push('/welcome')
        }
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-6">
        <Link href="/" className="flex items-center gap-2.5 mb-2">
          <Image src="/icons/logo.svg" width={30} height={30} alt="logo" />
          <h1 className="font-bold text-xl font-robo text-slate-900">Furever Home</h1>
        </Link>

        <div className="flex flex-col gap-1.5">
          <h1 className="text-2xl font-bold text-slate-900">
            {type === 'sign-in' ? 'Welcome back' : 'Create an account'}
          </h1>
          <p className="text-slate-500 text-sm">
            {type === 'sign-in'
              ? 'Sign in to continue finding your perfect companion'
              : 'Join thousands of families who found their perfect pet'}
          </p>
        </div>
      </header>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {type === 'sign-up' && (
            <>
              <div className="flex gap-4">
                <CustomInput control={form.control} name="firstName" label="First Name" placeholder="John" />
                <CustomInput control={form.control} name="lastName" label="Last Name" placeholder="Doe" />
              </div>
              <CustomInput control={form.control} name="city" label="City" placeholder="New York" />
              <div className="flex gap-4">
                <CustomInput control={form.control} name="state" label="State" placeholder="TX" />
                <CustomInput control={form.control} name="postalCode" label="ZIP Code" placeholder="10001" />
              </div>
              <CustomInput control={form.control} name="phone" label="Phone" placeholder="(555) 123-4567" />
            </>
          )}

          <CustomInput control={form.control} name="email" label="Email" placeholder="you@example.com" />
          <CustomInput control={form.control} name="password" label="Password" placeholder="••••••••" />

          <Button type="submit" disabled={loading} className="form-btn w-full mt-2">
            {loading ? (
              <><Loader2 size={18} className="animate-spin mr-2" />Loading...</>
            ) : type === 'sign-in' ? (
              'Sign In'
            ) : (
              'Create Account'
            )}
          </Button>
        </form>
      </Form>

      <footer className="flex justify-center gap-1.5 pt-2">
        <p className="text-sm text-slate-500">
          {type === 'sign-in' ? "Don't have an account?" : 'Already have an account?'}
        </p>
        <Link href={type === 'sign-in' ? '/sign-up' : '/sign-in'} className="form-link">
          {type === 'sign-in' ? 'Sign Up' : 'Sign In'}
        </Link>
      </footer>
    </section>
  )
}

export default AuthForm
