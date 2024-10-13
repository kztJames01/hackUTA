import Questions from '@/components/Questions'
import Link from 'next/link'
import Image from 'next/image'

const Welcome = () => {
  return (
    <div className="w-lg h-screen mx-auto flex items-center justify-center">
      <Link
        href="/"
        className="flex mb-12  cursor-pointer items-center gap-2 absolute top-10 left-10"
      >
        <Image
          src="/icons/logo.svg"
          width={34}
          height={34}
          alt="NxtGen logo"
          className="size=[24px] max-xl:size-14"
        />
        <h1 className=" font-bold text-26 font-robo text-gray-900 px-4 ">
          Furever Home
        </h1>
      </Link>
      <Questions />
    </div>
  )
}

export default Welcome
