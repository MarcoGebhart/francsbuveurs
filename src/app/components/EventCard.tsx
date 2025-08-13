import Image from "next/image"
import Event from "../../../public/evenements.jpeg"
export default function EventCard(){
    return (
        <div className="flex flex-col items-center gap-6 ">
        <h2>LES ÉVENEMENTS</h2>
        <figure className="w-full h-full">
            <Image 
            src={Event}
            alt="image du lien pour la boutique"
            
            className=" card w-full h-full object-cover border border-orange-500"/>
        </figure>
       </div>
    )
}