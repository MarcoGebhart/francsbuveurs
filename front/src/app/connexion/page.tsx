import Link from "next/link";
import LoginForm from "../components/LoginForm";

export default function loginAdmin(){
    return (
        <div className=" text-black flex flex-col items-center m-10">
            <h1 className=" text-2xl">CONNEXION ADMIN</h1>
            <LoginForm />
            <Link href={"https://www.shopify.com/fr/store-login"}>
                <button className="border border-orange-500 rounded-full p-2 hover:bg-orange-500 m-4">Connexion à l&apos;admin Shopify</button>
            </Link>
        </div>
    )
}