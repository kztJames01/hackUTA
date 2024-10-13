'use client'
import React from 'react'

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