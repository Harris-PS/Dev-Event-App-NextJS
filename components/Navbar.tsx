'use client'
import Link from "next/link"
import Image from "next/image"
import posthog from "posthog-js"

const Navbar = () => {
  const handleNavClick = (linkName: string) => {
    posthog.capture('nav_link_clicked', {
      link_name: linkName,
      nav_location: 'header',
    });
  };

  return (
    <nav className="flex flex-row justify-between mx-auto max-w-7xl sm:px-10 px-5 py-4">
      <Link href='/' className='flex flex-row items-center gap-2' onClick={() => handleNavClick('logo')}>
        <Image src="/icons/logo.png" alt="logo" width={24} height={24} />
        <span className="text-xl font-bold italic max-sm:hidden">DevEvent</span>
      </Link>

      <ul className="flex flex-row items-center gap-6 list-none">
        <Link href="/" onClick={() => handleNavClick('home')}><li>Home</li></Link>
        <Link href="/" onClick={() => handleNavClick('events')}><li>Events</li></Link>
        <Link href="/" onClick={() => handleNavClick('create_event')}><li>Create Event</li></Link>
      </ul>
    </nav>
  )
}
export default Navbar
