import React from 'react'

const Navbar = () => {
    return (
        <nav className="bg-purple-500 p-6 w-full sticky text-2xl flex h-[10vh] justify-between items-center text-center">
            < div className='flex  gap-2 items-center'>
                <span className='text-green-700 text-3xl'>&lt;</span>
                <div>
                    <span className='font-bold text-4xl text-fuchsia-800'>Pass</span><span className='font-bold text-red-800 text-2xl'>Guard</span>
                </div>
                <span className='text-green-700 text-3xl'>/&gt;</span>
            </div>
            <ul className='flex gap-5 '>
                <a href="/" className=" hover:font-bold hover:text-purple-200">Home</a>
                <a href="/about" className="hover:font-bold hover:text-purple-200">About</a>
                <a href="/contact" className=" hover:font-bold hover:text-purple-200">Contact</a>
            </ul>
        </nav>
    )
}

export default Navbar