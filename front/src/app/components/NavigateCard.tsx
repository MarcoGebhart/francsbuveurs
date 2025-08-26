import Image from "next/image"
import Event from "../../../public/biereenrang.jpg"
import Bar from "../../../public/tireuse2.jpg"
import Shop from "../../../public/ecommerce3.jpg"
import Link from "next/link"

export default function NavigateCard() {
    return (
        <div className="flex flex-col md:flex-row items-stretch justify-evenly m-8 gap-6">
            {/* Carte Événements */}
            <div className="flex flex-col items-center justify-between w-full md:w-1/3 overflow-hidden">
                <h2 className="text-center p-4">LES ÉVÉNEMENTS</h2>
                <Link href="/evenements" className="w-full">
                    <figure className="relative w-full  aspect-[4/3] border border-px-2 rounded hover:border-orange-500">
                        <Image
                            src={Event}
                            alt="bière en rang"
                            fill
                            className="object-cover"
                            unoptimized
                        />
                    </figure>
                </Link>
            </div>

            {/* Carte Boutique */}
            <div className="flex flex-col items-center justify-between w-full md:w-1/3 overflow-hidden">
                <h2 className="text-center p-4">LA BOUTIQUE EN LIGNE</h2>
                <Link href="/boutique" className="w-full">
                    <figure className="relative w-full aspect-[4/3] rounded border border-px-2 hover:border-orange-500">
                        <Image
                            src={Shop}
                            alt="bière soirée fille"
                            fill
                            className="object-cover"
                            unoptimized
                        />
                    </figure>
                </Link>
            </div>

            {/* Carte Bar */}
            <div className="flex flex-col items-center justify-between w-full md:w-1/3 overflow-hidden">
                <h2 className="text-center p-4">LE BAR</h2>
                <Link href="/bar" className="w-full">
                    <figure className="relative w-full aspect-[4/3] rounded border border-px-2 hover:border-orange-500">
                        <Image
                            src={Bar}
                            alt="bar tireuse"
                            fill
                            className="object-cover"
                            unoptimized
                        />
                    </figure>
                </Link>
            </div>
        </div>
    )
}
