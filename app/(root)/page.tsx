'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ContactForm from '../../components/ContactForm'
import { Button } from '../../components/ui/button'
import { PageWrapper } from '../../components/PageWrapper'
import { Navbar } from '../../components/Navbar'
import { useRef } from 'react'

const pets = [
  { name: 'Lora', desc: 'A playful poodle looking for her forever family', img: '/pet1.jpg' },
  { name: 'Jacky', desc: 'Three siblings hoping to stay together in a loving home', img: '/pet2.jpg' },
  { name: 'Elisa', desc: 'A gentle soul searching for someone to grow old with', img: '/pet3.jpg' },
]

const reasons = [
  { title: 'Save a Life', desc: 'Millions of pets need homes. Adopting gives one a second chance at a happy life.', img: '/pet1.jpg' },
  { title: 'Loyal Companion', desc: 'Adopted pets form deep bonds. They know you gave them a home and love you for it.', img: '/pet2.jpg' },
  { title: 'Enrich Your Life', desc: 'Studies show pet owners are happier, healthier, and less stressed.', img: '/pet3.jpg' },
]

const Home = () => {
  const featuredRef = useRef<HTMLDivElement>(null)

  return (
    <>
      <PageWrapper>
        <div className="relative">
          <Navbar />

          {/* hero */}
          <header className="relative min-h-screen flex flex-col justify-center items-center text-center bg-hero-gradient overflow-hidden px-6">
            {/* subtle dot pattern */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
                backgroundSize: '32px 32px',
              }}
            />
            <div className="relative z-10 max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-green-300 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
                🐾 AI-powered pet matching
              </div>
              <h1 className="text-6xl sm:text-7xl font-bold text-white mb-6 font-dancing leading-tight">
                Furever Home
              </h1>
              <p className="text-xl text-white/70 mb-10 max-w-xl mx-auto leading-relaxed">
                Find your perfect furry companion. We match you with pets that fit your lifestyle using smart recommendations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/sign-up">
                  <Button className="bg-green-500 hover:bg-green-400 text-white px-8 py-3 rounded-full text-base font-semibold h-auto transition-colors">
                    Start Matching
                  </Button>
                </Link>
                <Button
                  onClick={() => featuredRef.current?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-3 rounded-full text-base font-semibold h-auto transition-colors"
                >
                  View Available Pets
                </Button>
              </div>
            </div>

            {/* stats row */}
            <div className="relative z-10 mt-20 flex flex-wrap justify-center gap-12 text-center">
              {[
                { num: 'Coming Soon', label: 'Pets Available' },
                { num: 'Coming Soon', label: 'Successful Adoptions' },
                { num: 'Coming Soon', label: 'Shelter Partners' },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-3xl font-bold text-white">{s.num}</div>
                  <div className="text-white/50 text-sm mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </header>

          {/* why adopt */}
          <section className="px-6 py-24 bg-white">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <span className="text-green-600 text-sm font-semibold uppercase tracking-wider">Why it matters</span>
                <h2 className="text-4xl font-bold text-slate-900 mt-2">Why Adopt?</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {reasons.map((r) => (
                  <div key={r.title} className="group rounded-2xl overflow-hidden border border-slate-100 hover:shadow-lg transition-shadow">
                    <div className="overflow-hidden h-52">
                      <Image
                        src={r.img}
                        width={400}
                        height={208}
                        alt={r.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-slate-900 mb-2">{r.title}</h3>
                      <p className="text-slate-500 leading-relaxed text-sm">{r.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* featured pets */}
          <section ref={featuredRef} className="px-6 py-24 bg-slate-50">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <span className="text-green-600 text-sm font-semibold uppercase tracking-wider">Ready for adoption</span>
                <h2 className="text-4xl font-bold text-slate-900 mt-2">Featured Pets</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {pets.map((p, i) => (
                  <div key={i} className="group bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-lg transition-all duration-300">
                    <div className="overflow-hidden h-52 relative">
                      <Image
                        src={p.img}
                        width={400}
                        height={208}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-slate-900 mb-1">{p.name}</h3>
                      <p className="text-slate-500 text-sm mb-5 leading-relaxed">{p.desc}</p>
                      <Link href="/sign-up">
                        <Button className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl py-2 h-auto font-medium transition-colors">
                          Learn More
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* cta banner */}
              <div className="mt-16 bg-hero-gradient rounded-2xl p-10 text-center text-white">
                <h3 className="text-2xl font-bold mb-2">Find your perfect match</h3>
                <p className="text-white/70 mb-6">Our AI matches you based on your lifestyle, home, and preferences.</p>
                <Link href="/sign-up">
                  <Button className="bg-white text-green-900 hover:bg-green-50 px-8 py-2.5 rounded-full font-semibold h-auto transition-colors">
                    Get Started — It's Free
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* contact footer */}
          <footer className="px-6 py-20 bg-green-1000 text-white">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <Image src="/icons/logo.svg" width={28} height={28} alt="logo" />
                    <span className="font-bold text-lg font-robo">Furever Home</span>
                  </div>
                  <p className="text-white/60 mb-6 leading-relaxed">
                    Connecting loving families with pets in need. Every adoption changes two lives.
                  </p>
                  <div className="text-white/50 text-sm space-y-1">
                    <p>123 Adoption Street</p>
                    <p>Petsville, PA 12345</p>
                    <p>Phone: (555) 123-4567</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-6">Get in Touch</h3>
                  <ContactForm />
                </div>
              </div>
              <div className="border-t border-white/10 pt-8 text-center text-white/40 text-sm">
                © {new Date().getFullYear()} Furever Home. All rights reserved.
              </div>
            </div>
          </footer>
        </div>
      </PageWrapper>
    </>
  )
}

export default Home
