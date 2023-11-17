
import Image from 'next/image'
import KamNavBar from './components/Navbar';



export default function Home() {
 return (
<section className="Hero relative h-screen w-screen bg-[#000000] bg-opacity-100">
  {KamNavBar()}
  <div className="h-[90%]">
    <div className="ContentArea relative h-full">
      <div className="h-full">
        <div className="flex h-full w-screen items-end justify-end">
          <img src="https://azariaimages.s3.amazonaws.com/azpostclrs2.png" className="absolute top-0 h-[90%] w-screen object-contain object-top sm:h-full sm:w-screen-1/2" />
        </div>
        <div className="absolute bottom-0 flex">
        </div>
      </div>
      <div className="absolute bottom-4 right-0 z-10 flex sm:bottom-0 sm:right-4">
        <div className="mr-1 flex h-[50px] w-[50px] items-center justify-center border bg-white sm:m-2 sm:h-[80px] sm:w-[80px]">
          <a href="">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </a>
        </div>
        <div className="mr-1 flex h-[50px] w-[50px] items-center justify-center border bg-white sm:m-2 sm:h-[80px] sm:w-[80px]">
          <a href="">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</section>
  )
}

