import Image from 'next/image'

export default function Home() {
  return (
    
<section className="Hero relative h-screen w-screen bg-[#000000] bg-opacity-100">
  
  
  <div className="flex h-[10%] justify-end bg-white pr-2">
    {/* <label className="my-auto text-2xl sm:text-4xl">Chapter 1</label> */}

<a
  href="Lobby"
  className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
  target="_self"
  rel="noopener noreferrer"
>
  <h2 className={`mb-3 text-2xl font-semibold`}>
    Lobby{' '}
    <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
      -&gt;
    </span>
  </h2>
  <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
    Visit the game server lobby.
  </p>
</a>

<a
  href="https://www.kamiozablog.com/"
  className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
  target="_blank"
  rel="noopener noreferrer"
>
  <h2 className={`mb-3 text-2xl font-semibold`}>
    Blog{' '}
    <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
      -&gt;
    </span>
  </h2>
  <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
    Our stories and announcements.
  </p>
</a>

  </div>
  <div className="h-[90%]">
    <div className="ContentArea relative h-full">
      <div className="h-full">
       

        <div className="flex h-full w-screen items-end justify-end">
          <img src="https://azariaimages.s3.amazonaws.com/azpostclrs2.png" className="absolute top-0 h-[90%] w-screen object-contain object-top sm:h-full sm:w-screen-1/2" />
        </div>
        <div className="absolute bottom-0 flex">
          {/* <div>
            <div className="ProductInfo w-[200px] rounded bg-white p-4 sm:ml-10 sm:w-[280px] sm:bg-opacity-10 md:w-[520px]">
              <h4 className="text-xl sm:text-3xl md:text-6xl">Purple - Woollen Coat</h4>
              <h5 className="mt-2 text-base sm:text-xl md:text-2xl">SIZE</h5>
              <div className="mt-2 h-[24px] sm:h-[50px] md:h-[80px]"></div>
              <button className="mt-2 bg-[#4C56D7] px-10 py-2 text-white sm:px-14">QUICK ADD</button>
            </div>
          </div> */}
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




// <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
       


// <a
//   href="Lobby"
//   className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
//   target="_self"
//   rel="noopener noreferrer"
// >
//   <h2 className={`mb-3 text-2xl font-semibold`}>
//     Lobby{' '}
//     <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
//       -&gt;
//     </span>
//   </h2>
//   <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
//     Visit the game server lobby.
//   </p>
// </a>

// <a
//   href="https://kamioza.com/"
//   className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
//   target="_blank"
//   rel="noopener noreferrer"
// >
//   <h2 className={`mb-3 text-2xl font-semibold`}>
//     Kamioza{' '}
//     <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
//       -&gt;
//     </span>
//   </h2>
//   <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
//     Our stories and announcements.
//   </p>
// </a>
// </div>