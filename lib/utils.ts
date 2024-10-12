import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { z } from "zod"
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const authFormSchema = (type:string) => z.object({
    firstName: type === 'sign-in' ? z.string().optional() : z.string().min(3, 'First Name is required'),
    lastName: type === 'sign-in' ? z.string().optional() : z.string().min(3, 'Last name is required'),
    city: type === 'sign-in' ? z.string().optional() : z.string().max(50),
    state: type === 'sign-in' ? z.string().optional() : z.string().min(2).max(2),
    postalCode: type === 'sign-in' ? z.string().optional() : z.string().min(3).max(6),
    phone: type === 'sign-in' ? z.string().optional() : z.string().min(10).max(15),
    email: z.string().email('Invalid email'),
    password: z.string().min(8, 'Password is required'),
    //confirmPassword: type === 'sign-in' ? z.string().optional() : z.string().min(8, 'Password is required'),
})
// This is used to parse the query string and convert it to a javascript object
// so that it can be used in the zod schema
export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

export function encryptId(id: string) {
    return btoa(id);
}