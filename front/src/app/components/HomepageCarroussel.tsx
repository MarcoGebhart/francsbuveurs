import Image from "next/image";
import HomeBeer from "../../../public/imagehomepage bière.png"
import Neon from "../../../public/neonFrancsBuveurs.jpg"
import Salle from "../../../public/salle.jpg"
import Bar from "../../../public/bar.jpg"

export default function HomepageCarousel() {
  return (
    <div className="carousel w-full md:h-[50vh]">
      <div id="slide1" className="carousel-item relative w-full">
        <Image
          src={HomeBeer}
          alt="Image bière 1"
          className="w-full h-full object-cover object-bottom "
        />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide4" className="btn btn-circle">❮</a>
          <a href="#slide2" className="btn btn-circle">❯</a>
        </div>
      </div>

      <div id="slide2" className="carousel-item relative w-full">
        <Image
          src={Neon}
          alt="Image bière 2"
          className="w-full h-full  object-fill"
        />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide1" className="btn btn-circle">❮</a>
          <a href="#slide3" className="btn btn-circle">❯</a>
        </div>
      </div>

      <div id="slide3" className="carousel-item relative w-full">
        <Image
          src={Salle}
          alt="Image bière 3"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide2" className="btn btn-circle">❮</a>
          <a href="#slide4" className="btn btn-circle">❯</a>
        </div>
      </div>

      <div id="slide4" className="carousel-item relative w-full">
        <Image
          src={Bar}
          alt="Image bière 4"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide3" className="btn btn-circle">❮</a>
          <a href="#slide1" className="btn btn-circle">❯</a>
        </div>
      </div>
    </div>
  );
}
