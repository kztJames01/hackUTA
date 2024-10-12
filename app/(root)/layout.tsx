
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
                <div className="root-layout">
                    <Image src="/icons/logo.svg" width={30} height={30} alt="logo" />
                    <div>
                        
                    </div>
                </div>
                {children}
            </div>
            
        </main>
    );
}