
import HomepageCarroussel from "./components/HomepageCarroussel"
import BeerCarousel from "./components/BeerCaroussel"
import History from "./components/HistoryHomepage"
import Link from "next/link"
import NavigateCard from "./components/NavigateCard"



export default function Home() {
  return (
    <div className="bg-white text-black"> 
      <HomepageCarroussel />
      <div className="flex flex-col items-center">
        <h2 className="text-2xl mt-6">Nos Bières Artisanales</h2>
        <BeerCarousel />
        <Link href={"/boutique"}>
          <button className=" border border-orange-500 text-black bg-white rounded p-2 mt-6 hover:bg-orange-500 hover:text-white">LA BOUTIQUE</button>
        </Link>
      </div>
      <div className="text-center mt-8">
        <h1 className="text-3xl">BIENVENUE CHEZ LES FRANCS BUVEURS</h1>
        <History />  
      </div>
      <NavigateCard />
      
    </div>
  )
}
