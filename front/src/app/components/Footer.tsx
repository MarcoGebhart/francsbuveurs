import Image from "next/image";
import Logo from "../../../public/logoFooter.png"
import Link from "next/link";

export default function Footer() {
    return (
        <div className="text-black bg-white flex flex-col text-center flex-wrap m-auto gap-8 border-t p-4 md:flex-row md:justify-center">
            <Link href={"/connexion"} className="self-center cursor-default">
                <Image
                    src={Logo}
                    alt="logo francsbuveurs"
                    width={200}
                    height={100}     
                    >
                </Image>
            </Link>
            <div>
                <h2 className="text-xl mb-2 text-orange-500">FrancsBuveurs</h2>
                <p>3 chemin de Senlis</p>
                <p className="mb-2">95340 Bernes sur Oise</p>
                <p className="mb-2">01.39.37.28.54</p>
                <p><Link href={"/contact"} className="hover:border-b hover:text-orange-500 hover:border-b-orange-500">Nous contacter</Link></p>
                <p><Link href={"/infos-pratiques"} className="hover:border-b hover:text-orange-500 hover:border-b-orange-500">Infos partiques</Link></p>
            </div>
            <div>
                <h2 className="text-xl mb-2 text-orange-500"> Nos Horaires</h2>
                <p>Lundi: fermé</p>
                <p>Mardi: fermé</p>
                <p>Mercredi: fermé</p>
                <p>Jeudi: 17h-1h</p>
                <p>Vendredi: 17h-1h</p>
                <p>Samedi: 17h-1h</p>
                <p>Dimanche: 12h-20h</p>
            </div>
            <div className="flex flex-col">
                <h2 className="text-xl mb-2 text-orange-500"> Liens Utiles</h2>
                <p><Link href={"/"} className="hover:border-b hover:text-orange-500 hover:border-b-orange-500">Mentions légales</Link></p>
                <p><Link href={"/"} className="hover:border-b hover:text-orange-500 hover:border-b-orange-500">Politique de confidentialité</Link></p>
                <p><Link href={"/"} className="hover:border-b hover:text-orange-500 hover:border-b-orange-500">Conditions de livraison</Link></p>
                <p><Link href={"/"} className="hover:border-b hover:text-orange-500 hover:border-b-orange-500">CGV</Link></p>
                <p><Link href={"/"} className="hover:border-b hover:text-orange-500 hover:border-b-orange-500">Politique de cookies</Link></p>
            </div>
        </div>
    )
}