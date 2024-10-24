import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
    return (
        <div className='bg-green-400 shadow-xl shadow-white'>
            <div className='max-w-screen-xl mx-auto p-4 flex items-center justify-between'>
                {/* Logo Section */}
                <div className="logo">
                    <Image width={50} height={50} src="/logo.png" alt="logo" />
                </div>

                {/* Navigation Section */}
                <div>
                    <nav>
                        <ul className='flex space-x-4'>
                            <li>
                                <Link  className='font-serif text-white text-lg' href="/create-qr-code">
                                    Create QR Code
                                </Link>
                            </li>
                            <li>
                                <Link className='font-serif text-white text-lg' href="/list-qr-code">
                                    List QR Code
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default Navbar;
