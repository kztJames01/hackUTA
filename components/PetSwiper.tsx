'use client'

import React, { useEffect } from 'react'
import TinderCard from 'react-tinder-card'
import { motion, AnimatePresence } from 'framer-motion'
import { BsChatRightDots } from 'react-icons/bs'
import { BeatLoader } from 'react-spinners'
import Link from 'next/link'
import { IoMdClose } from 'react-icons/io'
import ReactIframe from 'react-iframe'
import Image from 'next/image'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { useRouter } from 'next/navigation'
import {
  Building2,
  PawPrint,
  Settings,
  Shield,
  LogOut,
  ChevronRight,
} from 'lucide-react'

const mockShelters = [
  {
    name: 'Austin Animal Center',
    city: 'Austin, TX',
  },
  {
    name: 'PAWS Rescue Dallas',
    city: 'Dallas, TX',
  },
  {
    name: 'Houston Humane Society',
    city: 'Houston, TX',
  },
]

const PetSwiper = () => {
  const router = useRouter()
  const [pets, setPets] = React.useState<{ [key: string]: string }[]>()
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [openChat, setOpenChat] = React.useState(false)
  const [isGettingPersonalized, setIsGettingPersonalized] =
    React.useState(false)
  const [likedPets, setLikedPets] = React.useState<{ [key: string]: string }[]>(
    []
  )
  const [profileName, setProfileName] = React.useState('Pet Lover')

  useEffect(() => {
    const fetchData = () => {
      fetch('http://localhost:5000/random_recommendation')
        .then((response) => response.json())
        .then((data) => {
          setPets(data)
          console.log(data)
        })
        .catch((error) => {
          console.error('Error fetching data:', error)
          setTimeout(fetchData, 5000) // Retry after 5 seconds
        })
    }

    fetchData()
  }, [])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) return
      const fallbackName = user.email?.split('@')[0] ?? 'Pet Lover'
      setProfileName(user.displayName || fallbackName)
    })

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    if (pets && currentIndex >= pets.length) {
      setIsGettingPersonalized(true)
      fetch('http://localhost:5000/update_recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pets: likedPets,
          userid: '7DDrvDU9bCX1p0adhq61HhkaFC63',
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setTimeout(() => {
            setPets(data)
            setCurrentIndex(0)
            setIsGettingPersonalized(false)
          }, 1000)
        })
        .catch((error) => {
          console.error('Error fetching data:', error)
          setCurrentIndex(0)
          setTimeout(() => {}, 5000) // Retry after 5 seconds
        })
    }
  }, [currentIndex, likedPets, pets])

  const handleLogout = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error('Error logging out:', error)
    } finally {
      router.push('/sign-in')
    }
  }

  return (
    <div className="w-screen overflow-hidden relative h-screen bg-slate-50">
      {openChat && (
        <ReactIframe
          url="http://localhost:8501/"
          width="100%"
          height="100%"
          id="myId"
          className="absolute z-50"
          display="initial"
          position="absolute"
        />
      )}
      <div className="flex h-full w-full">
        <aside className="hidden md:flex w-[320px] border-r border-slate-200 bg-white px-5 py-6 flex-col">
          <Link href="/" className="flex cursor-pointer items-center gap-2 mb-6">
            <Image
              src="/icons/logo.svg"
              width={30}
              height={30}
              alt="Furever Home logo"
            />
            <h1 className="font-bold text-20 font-robo text-slate-900">
              Furever Home
            </h1>
          </Link>

          <div className="space-y-6 overflow-y-auto pr-2 custom-scrollbar flex-1">
            <section className="rounded-lg border border-slate-200 p-4 bg-slate-50">
              <h2 className="text-14 font-semibold text-slate-900 flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Animal Shelters
              </h2>
              <ul className="mt-3 space-y-2">
                {mockShelters.map((shelter) => (
                  <li
                    key={shelter.name}
                    className="rounded-md bg-white border border-slate-200 px-3 py-2"
                  >
                    <p className="text-14 font-medium text-slate-900">
                      {shelter.name}
                    </p>
                    <p className="text-12 text-slate-500">{shelter.city}</p>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-lg border border-slate-200 p-4 bg-slate-50">
              <h2 className="text-14 font-semibold text-slate-900 flex items-center gap-2">
                <PawPrint className="h-4 w-4" />
                Chosen Ones
              </h2>
              <div className="mt-3 space-y-2">
                {likedPets.length > 0 ? (
                  likedPets.map((pet) => (
                    <div
                      key={`${pet['Pet name']}-${pet['URL Link']}`}
                      className="rounded-md bg-white border border-slate-200 px-3 py-2"
                    >
                      <p className="text-14 font-medium text-slate-900">
                        {pet['Pet name'].replace(/^\*/, '').trim()}
                      </p>
                      <p className="text-12 text-slate-500">
                        {pet['Breed']
                          .toLowerCase()
                          .split(' ')
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() + word.slice(1)
                          )
                          .join(' ')}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-12 text-slate-500">
                    Swipe right on a pet to save it here.
                  </p>
                )}
              </div>
            </section>
          </div>

          <footer className="mt-6 border-t border-slate-200 pt-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-full bg-green-100 text-green-800 flex items-center justify-center font-semibold">
                {profileName.slice(0, 1).toUpperCase()}
              </div>
              <p className="text-14 font-medium text-slate-900 truncate">
                {profileName}
              </p>
            </div>

            <button
              type="button"
              onClick={() => router.push('/settings')}
              className="w-full flex items-center justify-between rounded-md px-2 py-2 text-14 text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <span className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </span>
              <ChevronRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => router.push('/privacy')}
              className="w-full flex items-center justify-between rounded-md px-2 py-2 text-14 text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <span className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Privacy
              </span>
              <ChevronRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="w-full flex items-center justify-between rounded-md px-2 py-2 text-14 text-red-600 hover:bg-red-50 transition-colors"
            >
              <span className="flex items-center gap-2">
                <LogOut className="h-4 w-4" />
                Log Out
              </span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </footer>
        </aside>

        <main className="relative flex-1">
          <div
            onClick={() => {
              setOpenChat((prev) => !prev)
            }}
            className="cursor-pointer absolute z-50 right-10 bottom-10 w-[80px] h-[80px] bg-red-500 rounded-full flex items-center justify-center"
          >
            <AnimatePresence>
              {openChat ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                >
                  <IoMdClose className="w-[52px] h-[52px] fill-white" />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                >
                  <BsChatRightDots className="w-[38px] h-[38px] fill-white" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="select-none w-full h-full flex flex-col items-center justify-center pt-20 px-4">
            {pets && currentIndex < pets.length ? (
              <TinderCard
                className="absolute"
                key={`${pets[currentIndex]['Pet name']}-${currentIndex}`}
                preventSwipe={['up', 'down']}
                onSwipe={(dir) => {
                  const currentPet = pets[currentIndex]
                  if (dir === 'right') {
                    setLikedPets((prev) => {
                      const alreadyChosen = prev.some(
                        (pet) =>
                          pet['Pet name'] === currentPet['Pet name'] &&
                          pet['URL Link'] === currentPet['URL Link']
                      )
                      if (alreadyChosen) return prev
                      return [...prev, currentPet]
                    })
                  }
                  setCurrentIndex((prev) => prev + 1)
                }}
              >
                <motion.div
                  className="shadow-black-1 shadow-lg w-[58vh] max-w-[92vw] h-[80vh] bg-cover bg-center rounded-[20px]"
                  style={{
                    backgroundImage: `url(${pets[currentIndex]['URL Link']})`,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7 }}
                ></motion.div>
                <motion.div
                  className="absolute bottom-0 w-full rounded-b-[20px] bg-gradient-to-t from-black-1 to-transparent p-5 pt-16"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7 }}
                >
                  <h3 className="text-2xl font-bold text-white ">
                    {pets[currentIndex]['Pet name'].replace(/^\*/, '').trim()}
                    <span className="relative left-10 text-sm font-light opacity-90">
                      {pets[currentIndex]['Sex'] === 'S' ? 'Male' : 'Female'}
                    </span>
                  </h3>
                  <h4 className="text-white font-inter pt-2">
                    {pets[currentIndex]['Breed']
                      .toLowerCase()
                      .split(' ')
                      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(' ')}
                  </h4>
                </motion.div>
              </TinderCard>
            ) : (
              <div className="flex justify-center items-center h-screen gap-3">
                {isGettingPersonalized ? (
                  <div>Getting Personalized Pet Recommendations</div>
                ) : (
                  ''
                )}
                <BeatLoader color="#00FF00" />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

export default PetSwiper
