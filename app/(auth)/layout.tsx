import Image from 'next/image'

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="flex min-h-screen w-full font-inter">
            <div className="flex flex-1 items-center justify-center bg-white">
                {children}
            </div>

            {/* right panel - visible on large screens */}
            <div className="hidden lg:flex w-[45%] bg-hero-gradient relative overflow-hidden flex-col items-center justify-center p-12">
                {/* dot pattern */}
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
                        backgroundSize: '28px 28px',
                    }}
                />

                <div className="relative z-10 text-center max-w-sm">
                    <div className="w-20 h-20 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mx-auto mb-8">
                        <Image src="/icons/logo.svg" width={44} height={44} alt="logo" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-4 font-dancing">
                        Find Your Furever Friend
                    </h2>
                    <p className="text-white/65 leading-relaxed text-sm">
                        Our AI matches you with pets based on your lifestyle, home, and preferences — making adoption easy and joyful.
                    </p>

                    <div className="mt-10 flex flex-col gap-3">
                        {[
                            '🐾  AI-powered pet matching',
                            '❤️  500+ pets waiting for a home',
                            '✅  Trusted by 50+ shelters',
                        ].map((item) => (
                            <div key={item} className="flex items-center gap-3 bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-sm text-white/80">
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
