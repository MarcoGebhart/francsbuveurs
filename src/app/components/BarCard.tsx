import Image from "next/image"
import Bar from "../../../public/tireuse2.jpg"
export default function BarCard(){
    return (
        <div className="flex flex-col items-center gap-6 ">
        <h2>LE BAR</h2>
        <figure className="w-full h-full">
            <Image 
            src={Bar}
            alt="image du lien pour la boutique"
            width={130}
            height={100}
            className=" card w-full h-full object-cover border border-orange-500"/>
        </figure>
       </div>
    )
}