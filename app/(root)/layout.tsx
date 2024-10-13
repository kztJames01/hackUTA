'use client'
import { Navbar } from "@/components/Navbar";
import Image from "next/image";
export const dynamic = 'force-dynamic'
export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    
    return (
        <main className="flex h-screen w-full font-inter">
            
            <div className="flex size-full flex-col">
                
                {children}
            </div>
            
        </main>
    );
}