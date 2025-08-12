import Image from "next/image"
import Bagerna from "../../../public/bouteilleBagerna.png"
import Summer from "../../../public/bouteilleSummertwist.png"
import Eclipse from "../../../public/bouteilleEclipse.png"

export default function BeerCarousel(){
    return(
        <div className="carousel w-1/2 mt-4">
            {/* Mobile : slide 1 */}
            <div id="m-slide1" className="carousel-item relative w-full md:hidden">
                <figure className="card border border-px-2 hover:border-orange-500 w-full">
                <Image
                    src={Bagerna}
                    alt="Bagerna"
                    width={300}
                    height={200}
                    className=" card w-full h-full object-cover"
                    unoptimized
                />
                </figure>
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#m-slide3" className="text-orange-500">❮</a>
                <a href="#m-slide2" className="text-orange-500">❯</a>
                </div>
            </div>

            {/* Mobile : slide 2 */}
            <div id="m-slide2" className="carousel-item relative w-full md:hidden">
                <figure className="card border border-px-2 hover:border-orange-500 w-full">
                <Image
                    src={Summer}
                    alt="Summer"
                    width={300}
                    height={200}
                    className="w-full h-full object-cover"
                    unoptimized
                />
                </figure>
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#m-slide1" className="text-orange-500">❮</a>
                <a href="#m-slide3" className="text-orange-500">❯</a>
                </div>
            </div>

            {/* Mobile : slide 3 */}
            <div id="m-slide3" className="carousel-item relative w-full md:hidden">
                <figure className="card border border-px-2 hover:border-orange-500 w-full">
                <Image
                    src={Eclipse}
                    alt="Eclipse"
                    width={300}
                    height={200}
                    className="w-full h-full object-cover"
                    unoptimized
                />
                </figure>
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#m-slide2" className="text-orange-500">❮</a>
                <a href="#m-slide1" className="text-orange-500">❯</a>
                </div>
            </div>

            {/* Tablette et + : affichage statique des 3 images */}
            <div className="hidden md:flex gap-1 w-full justify-center">
                <figure className="card border border-px-2 hover:border-orange-500 w-60">
                <Image
                    src={Bagerna}
                    alt="Bagerna"
                    width={300}
                    height={200}
                    className="w-full h-full object-cover"
                    unoptimized
                />
                </figure>
                <figure className="card border border-px-2 hover:border-orange-500 w-60">
                <Image
                    src={Summer}
                    alt="Summer"
                    width={300}
                    height={200}
                    className="w-full h-full object-cover"
                    unoptimized
                />
                </figure>
                <figure className="card border border-px-2 hover:border-orange-500 w-60">
                <Image
                    src={Eclipse}
                    alt="Eclipse"
                    width={300}
                    height={200}
                    className="w-full h-full object-cover"
                    unoptimized
                />
                </figure>
            </div>
        </div>
    )
}

