'use server'
import {connectToDatabase} from "../db";
import { parseStringify } from "../utils";

import { serialize } from "cookie";
import { NextResponse } from "next/server";
import { auth } from "../firebase";
import {  createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
export const signUp = async ({password, ...userData}: SignUpParams) => {
    try{
        const userCredential = await createUserWithEmailAndPassword(auth, userData.email, password);
        const user = userCredential.user;

        const {db} = await connectToDatabase();
        const newUser = await db.collection('user').insertOne({
            ...userData,
            userId: user.uid,
            createdAt: new Date(),
        });
        const sessionCookie = serialize('sessionId', user.uid, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'development', // Use secure cookies in production
            maxAge: 60 * 60 * 24, // 1 day
            path: '/', // Available throughout the site
        });

        // Return response with cookie set
        return (parseStringify(newUser), {
            headers: {
                'Set-Cookie': sessionCookie,
            },
        });
        
    }catch(error){
        console.log(error);
    }
}

export const signIn = async ({ email, password }:LoginUser) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Set cookie with user ID or token
        const sessionCookie = serialize('sessionId', user.uid, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'development', // Use secure cookies in production
            maxAge: 60 * 60 * 24, // 1 day
            path: '/', // Available throughout the site
        });
        const userData = parseStringify(user);

        // Return response with cookie set
        return (parseStringify(userData), {
            headers: {
                'Set-Cookie': sessionCookie,
            },
        });
    } catch (error) {
        console.error(error);
    }
};
export const logoutAccount = async () => {
    try {

        // Delete the session cookie
        const sessionCookie = serialize('sessionId', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'development', // Use secure cookies in production
            maxAge: -1, // This will expire the cookie
            path: '/',
        });

        await auth.signOut();

        return NextResponse.json({ success: true }, {
            headers: {
                'Set-Cookie': sessionCookie,
            },
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false });
    }
};



// export const getUserInfo = async ({ userId }:getUserInfoProps) => {
//     try {
//         const { db } = await connectToDatabase();

//         const user = await db.collection('user').findOne({ userId }); // Assuming 'users' is your collection name
//         return user ? parseStringify(user) : null; // Return user data or null if not found
//     } catch (error) {
//         console.error('Error fetching user info:', error);
//         return null; // Handle errors gracefully
//     }
// };

export const getLoggedInUser = async (cookieHeader: string | null) => {
    try {
        const sessionId = getSessionIdFromCookies(cookieHeader);

        if (!sessionId) {
            return null; // If there's no session, return null
        }

        const { db } = await connectToDatabase();
        const user = await db.collection('user').findOne({ userId:  sessionId});

        return user ? parseStringify(user) : null; // Return user data or null if not found
    } catch (error) {
        console.error('Error fetching logged-in user:', error);
        return null; // Handle errors gracefully
    }
};


// Implement a function to extract session ID from cookies
// Utility function to get session ID from cookies
const getSessionIdFromCookies = (cookieHeader: string | null) => {
    if (!cookieHeader) {
        return null; // No cookies available
    }

    // Parse cookies from the cookie header
    const cookies = cookieHeader
        .split('; ')
        .reduce<Record<string, string>>((acc, cookie) => {
            const [name, value] = cookie.split('=');
            acc[name] = decodeURIComponent(value);
            return acc;
        }, {});

    return cookies['sessionId'] || null; // Replace 'sessionId' with your actual cookie name
};



