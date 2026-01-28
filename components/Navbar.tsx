import Link from "next/link"
import Image from "next/image"


const Navbar = () => {
  return (
    <nav className="flex flex-row justify-between mx-auto max-w-7xl sm:px-10 px-5 py-4">
      <Link href='/' className='flex flex-row items-center gap-2'>
        <Image src="/icons/logo.png" alt="logo" width={24} height={24} />
        <span className="text-xl font-bold italic max-sm:hidden">DevEvent</span>
      </Link>

      <ul className="flex flex-row items-center gap-6 list-none">
        <Link href="/"><li>Home</li></Link>
        <Link href="/"><li>Events</li></Link>
        <Link href="/"><li>Create Event</li></Link>
      </ul>
    </nav>
  )
}
export default Navbar