import Image from "next/image"
import Link from "next/link"

const Navbar = () => {
  return (
    <header>
        <nav>
            <Link href='/' className="logo">
                <Image src="/icons/logo.png" alt='logo' width={24} height={24}></Image>
                <p>DevEvent</p>
            </Link>

            <ul>
                <Link href='/'>Home</Link>
                <Link href='/'>Create Events</Link>
                <Link href='/'>Events</Link>
            </ul>
        </nav>
    </header>
  )
}

export default Navbar