import Image from "next/image";
import Shop from "../../../public/ecommerce3.jpg"

export default function ShopCard(){
    return(
       <div className="flex flex-col items-center gap-6  ">
        <h2>LA BOUTIQUE EN LIGNE</h2>
        <figure className="w-full h-full">
            <Image 
            src={Shop}
            alt="image du lien pour la boutique"
            width={300}
            height={100}
            className=" card w-full h-full object-cover border border-orange-500"/>
        </figure>
       </div> 
    )
}