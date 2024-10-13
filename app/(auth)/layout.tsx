'use client'
import Image from 'next/image'

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="flex min-h-screen w-full justify-between font-inter">
            {children}
            <div className="auth-asset">
                <div className='rounded-xl border border-gray-200 overflow-hidden' style={{ width: '75%' }}>
                    <Image
                        src='/dog.jpg'
                        width={200}
                        height={200}
                        alt="auth"
                        className='w-[66.67vw] h-full object-cover rounded-xl'
                        style={{ marginLeft: '-25%' }}
                    />
                </div>
            </div>
        </main>
    );
}