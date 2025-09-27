import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import '../components/ui/gradient.css'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className='w-full bg-[#4A628A] py-8 px-14 text-center'>
      <div className="container mx-auto text-center flex flex-col md:flex-row items-center justify-between gap-6">
        <div className='flex flex-col items-center gap-5'>
          <div className="mb-4">
            <Image src="/logo.png" alt="ZvioNews Logo" width={150} height={50} />
          </div>
          <div className="flex justify-center space-x-6 mb-6">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebook size={24} className="text-white hover:scale-110 transition-all duration-300" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FaTwitter size={24} className="text-white hover:scale-110 transition-all duration-300" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram size={24} className="text-white hover:scale-110 transition-all duration-300" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin size={24} className="text-white hover:scale-110 transition-all duration-300" />
            </a>
          </div>
        </div>

        <div className="text-white text-sm mb-4 text-start">
          <p>
            ბათუმი, საქართველო <br />
            ელ-ფოსტა: <a href="mailto:adjara.hot.news@gmail.com" className='hover:underline transition-all duration-300'>adjara.hot.news@gmail.com</a> <br />
            ტელეფონი: <a href="tel:+995558248248" className="hover:underline transition-all duration-300">+995 558 24 82 48</a>
          </p>
        </div>

        <div className="flex justify-center items-start space-x-4 mb-4 text-white flex-col">
          <Link href="/about-us" className="hover:underline transition-all duration-300">ჩვენს შესახებ</Link>
          <Link href="/terms" className="hover:underline transition-all duration-300">წესები და პირობები</Link>
          <Link href="/privacy" className="hover:underline transition-all duration-300">კონფიდენციალურობის პოლიტიკა</Link>
        </div>
      </div>
        <div className="text-white text-xs">
          <p>&copy; 2023 ZvioNews. ყველა უფლება დაცულია.</p>
        </div>
    </footer>
  )
}

export default Footer