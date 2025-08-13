
import HomepageCarroussel from "./components/HomepageCarroussel"
import BeerCarousel from "./components/BeerCaroussel"
import History from "./components/HistoryHomepage"
import ShopCard from "./components/ShopCard"
import EventCard from "./components/EventCard"
import BarCard from "./components/BarCard"



export default function Home() {
  return (
    <div className="bg-white text-black"> 
      <HomepageCarroussel />
      <div className="flex flex-col items-center">
        <h2 className="text-2xl mt-6">Nos Bières Artisanales</h2>
        <BeerCarousel />
        <button className=" w-1/3 border border-orange-500 text-black bg-white rounded p-2 mt-6 hover:bg-orange-500 hover:text-white">LA BOUTIQUE</button>
      </div>
      <div className="text-center mt-8">
        <h1 className="text-3xl">BIENVENUE CHEZ LES FRANCS BUVEURS</h1>
        <History />  
      </div>
      <div className="flex flex-col items-center gap-6 mt-8">
        <ShopCard />
        <EventCard />
        <BarCard />
      </div>
    </div>
  )
}
