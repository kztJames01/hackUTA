import React from 'react'
import {
    FormControl,
    FormField,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Control, FieldPath } from 'react-hook-form'
import { z } from 'zod'
import { authFormSchema } from '@/lib/utils'

const formSchema = authFormSchema("sign-up")

interface CustomInputProps {
    control: Control<z.infer<typeof formSchema>>,
    name: FieldPath<z.infer<typeof formSchema>>,
    label: string,
    placeholder: string
}

const CustomInput: React.FC<CustomInputProps> = ({ control, name, label, placeholder }) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <div className='form-item'>
                    <FormLabel className='form-label'>{label}</FormLabel>
                    <div className='flex w-full flex-col'>
                        <FormControl>
                            <Input
                                type="text" // Change this if you want a specific input type
                                placeholder={placeholder}
                                className="input-class"
                                {...field}
                            />
                        </FormControl>
                        <FormMessage className='form-message mt-2' />
                    </div>
                </div>
            )}
        />
    )
}

export default CustomInput
