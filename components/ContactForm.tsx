
'use client'
import React from 'react'
import {
    Form,
    FormField,
    FormLabel,
    FormMessage,
    FormControl,

} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { contact } from '@/lib/utils'
const ContactForm = () => {
    const [loading, setLoading] = useState(false);
    const schema = contact;
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            email: "",
            message: "",
        }
    })
    const onSubmit = async (data: z.infer<typeof schema>) => {
        setLoading(true);
    }
    return (
        <section className='flex flex-col gap-4 w-[60vw]'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                            <div className='form-item'>
                                <FormLabel className='form-label'>Email</FormLabel>
                                <div className='flex w-full flex-col'>
                                    <FormControl>
                                        <Input
                                            type="text" // Change this if you want a specific input type
                                            placeholder="Enter your email"
                                            className="contact-form h-10 resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className='form-message mt-2' />
                                </div>
                            </div>
                        )}
                    />
                    <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                            <div className='form-item'>
                                <FormLabel className='form-label'>Message</FormLabel>
                                <div className='flex w-full flex-col'>
                                    <FormControl>
                                        <textarea
                                            placeholder="Enter your message to us"
                                            className="h-40 contact-form resize-none p-3"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className='form-message mt-2' />
                                </div>
                            </div>
                        )}
                    />


                    <Button type="submit" disabled={loading} className="form-btn w-full rounded-xl ">
                        {loading ?
                            <>
                                <Loader2 size={20} className='animate-spin mr-3' /> &nbsp;
                                Loading...
                            </>
                            :
                            "Submit"
                        }
                    </Button>

                </form>
            </Form>
        </section>
    )
}

export default ContactForm