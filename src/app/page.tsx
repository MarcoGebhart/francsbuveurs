

import HomepageCarroussel from "./components/HomepageCarroussel"
import BeerCarousel from "./components/BeerCaroussel"
export default function Home() {
  return (
    <div className="bg-white text-black"> 
      <HomepageCarroussel />
      <div className="flex flex-col items-center">
        <h1 className="text-2xl mt-6">Nos Dernières Bières</h1>
        <BeerCarousel />
        <button className=" w-1/4 border border-orange-500 text-black bg-white rounded p-2 mt-6">LA BOUTIQUE</button>
      </div>  
    </div>
  )
}
