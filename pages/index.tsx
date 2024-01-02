
import Image from 'next/image'
import KamNavBar from '../components/Navbar';
import {ImageTrain} from '../components/ImageWelcome';



export default function Home() {
 return (
<section className="Hero relative h-screen w-screen bg-[#000000] bg-opacity-100">
  <KamNavBar currentPage = "/"></KamNavBar>
  <div className="h-[90%]">
    <div className="ContentArea relative h-full">
      
      <div className="h-full">
       <ImageTrain></ImageTrain>
      </div>

     
    </div>
  </div>
</section>
  )
}

