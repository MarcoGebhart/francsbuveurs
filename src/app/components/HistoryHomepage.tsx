import Image from "next/image";
import Cuve from "../../../public/cuve2.png"
import Link from "next/link";


export default function History() {
    return (
        <div className="card flex flex-col items-center m-6">
            <Image
                src={Cuve}
                alt="Cuve"
                className=" card w-full h-full object-cover border border-orange-500" />
            <p className="text-xl mt-6">Une devise : &apos; Du champ à la chope &apos;.</p>
            <p className="mt-6"> Pour l&apos;instant, nous avons une gamme de six bières différentes. Nous explorons de nombreuses pistes : des vieilles recettes oubliées, des bières agricoles historiquement brassées pour les saisonniers mais aussi des créations intégrant des fleurs, des fruits ou encore du houblon américain, pour des IPA aux belles amertumes et aux notes fruitées.
            </p>
            <Link href={"/brasserie"}>
                <button className="border border-orange-500 text-black bg-white rounded p-2 mt-6 hover:bg-orange-500 hover:text-white ">LA BRASSERIE</button>
            </Link>
        </div>
        
    )
}