
'use client'
import React from 'react'
import {
    Form,
    FormField,
    FormLabel,
    FormMessage,
    FormControl,

} from "../components/ui/form"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { contact } from '../lib/utils'
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
        <section className='flex flex-col gap-4 w-full max-w-md'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                            <div className='form-item'>
                                <FormLabel className='text-white/80 text-sm font-medium'>Message</FormLabel>
                                <div className='flex w-full flex-col'>
                                    <FormControl>
                                        <textarea
                                            placeholder="Tell us how we can help..."
                                            className="h-36 resize-none rounded-xl border border-white/15 bg-white/10 text-white placeholder:text-white/35 w-full p-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/40 focus:border-green-500/60 transition-all"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className='form-message mt-1.5' />
                                </div>
                            </div>
                        )}
                    />

                    <Button type="submit" disabled={loading} className="w-full bg-green-600 hover:bg-green-500 text-white rounded-xl py-2.5 h-auto font-semibold transition-colors">
                        {loading ?
                            <><Loader2 size={18} className='animate-spin mr-2' />Sending...</>
                            :
                            "Send Message"
                        }
                    </Button>
                </form>
            </Form>
        </section>
    )
}

export default ContactForm