'use client';
import { API_URL } from "@/lib/config";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";




export default function LoginForm(){
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);
        const email = formData.get('email');
        const password = formData.get('password');

        const checkCredentials = async () => {
            if(
                !email ||
                !password ||
                typeof email !== 'string' ||
                typeof password !== 'string'
            ) {
                setErrorMessage("Veuillez remplir tous les champs correctement.");
                return;
            }
            setIsLoading(true);

            try {
                await axios.post(`${API_URL}/login`,
                    {email, password},
                    {withCredentials: true}
                );
                console.log("Connexion réussie")
                router.push("/")
            } catch (error) {
                const err = error as AxiosError
                console.log('Erreur lors de la connexion:', err); // Si mdp ou email incorrect on reçoit une 400
                console.log('Response dans catch:', err.response);

                if (err.response && err.response.status === 400 || err.response?.status === 401) {
                    const backendMessage = (err.response.data as { message?: string })?.message;
                    setErrorMessage(backendMessage || "Email ou mot de passe incorrect.");
                } else {
                    setErrorMessage("Une erreur est survenue. Veuillez réessayer plus tard.");
                }
            } finally {
                setIsLoading(false);
            }
        };
        checkCredentials();
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="flex items-center flex-col border border-orange-500 rounded p-4 mt-10">
                <fieldset className="fieldset w-full mb-6">
                    <legend className="fieldset text-black text-xl sm:text-2xl mb-2">Email</legend>
                    <input type="text" name="email" className="input w-full" required/>
                    <legend className="fieldset text-black text-xl sm:text-2xl mt-a mb-2">Mot de passe</legend>
                    <input type="password" name='password' className="input w-full" required/>
                    <div className='text-end '>
                        <Link className='text-black underline text-sm sm:text-base' href="#">Mot de passe oublié ?</Link>
                    </div>
                                
                </fieldset>
                {errorMessage && (
                    <p className='text-red-500 text-sm mb-4 text-center'>{errorMessage}</p>
                )}
                <button className="border border-orange-500 rounded-full hover:bg-orange-500 w-full text-lg sm:text-xl mb-4" type='submit' disabled={isLoading}>{isLoading ? "Connexion..." : "Me connecter"}</button>
                
                            
            </div>
        </form>
    )
}