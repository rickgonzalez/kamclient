'use client'
import Testtable from './components/Testtable';
import KamNavBar from './components/Navbar';

export default function Lobby() {
 return (
  <section className="Hero relative h-screen w-screen bg-[#000000] bg-opacity-100">
      {KamNavBar()}
      <Testtable></Testtable>
  </section>
  )
}


