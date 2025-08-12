

import HomepageCarroussel from "./components/HomepageCarroussel"
import BeerCarousel from "./components/BeerCaroussel"
export default function Home() {
  return (
    <div> 
      <HomepageCarroussel />
      <div className="flex flex-col items-center">
        <h1 className="text-2xl mt-4">Nos Dernières Bières</h1>
        <BeerCarousel /> 
      </div>  
    </div>
  )
}
