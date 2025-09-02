import { useAuth } from "@/context/AuthContext";
import { API_URL } from "@/lib/config";
import axios from "axios";
import { useState } from "react"

function slugify(str: string) {
    return str
      .toLowerCase()
      .normalize('NFD')            // Décompose les caractères accentués
      .replace(/[\u0300-\u036f]/g, '') // Supprime les diacritiques (accents)
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-');
  };
interface IEventCreateProps {
    onUpdate: () => void;
}

export default function EventCreate({onUpdate}: IEventCreateProps){
    const {user} = useAuth()
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [hour, setHour] = useState("");
    const [img, setImg] = useState("");
    const [successMessage, setSuccessMessage] = useState('');
    const [isSuccessMessage, setIsSuccessMessage] = useState(true);
    
    const handleCreate = async () => {
        try {
            const slug = slugify(title);
            await axios.post(`${API_URL}/events`,
                {
                    title,
                    description,
                    date,
                    hour,
                    img,
                    slug,
                    id_app_user: user?.id,
                },{withCredentials: true}
            );
            setTitle("");
            setDescription("");
            setDate("");
            setHour("");
            setImg("");
            setSuccessMessage('✅ Enregistrement créé avec succès !');
            setIsSuccessMessage(true);
            onUpdate();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setSuccessMessage('❌ Une erreur est survenue lors de l\'enregistrement.');
                setIsSuccessMessage(false)
                console.error('Erreur Axios:', error.response?.data || error.message);
            }
        }
    }
    return (
        <div className="border border-orange-500 rounded p-2">
            <fieldset>
            <div className='flex flex-col items-center md:flex md:flex-row md:items-center justify-center md:gap-4 md:justify-between space-y-4'>
                    <input
                        type="text"
                        className="input text-center md:h-[80] md:m-auto"
                        placeholder='title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea className=" textarea text-center md:m-auto" placeholder='Description' value={description} onChange={(event) => setDescription(event.target.value)} />
                    <input
                        type="text"
                        className="input text-center md:w-40 md:h-[80] md:m-auto"
                        placeholder="Nom de l'image"
                        value={img}
                        onChange={(event) => {setImg(event.target.value)}}
                    />
                    <input
                        type="date"
                        className="input text-center md:w-40 md:m-auto"
                        placeholder="Date de la évènement"
                        value={date}
                        onChange={(event) => {setDate(event.target.value)}}
                    />
                    <input
                        type="time"
                        className="input text-center md:w-40 md:m-auto"
                        placeholder="heure de l'évènement"
                        value={hour}
                        onChange={(event) => {setHour(event.target.value)}}
                    />
                    
                    <button className="btn rounded border-orange-500 text-3xl text-black" onClick={handleCreate}>+</button>
                     
                </div>   
            </fieldset>
            {successMessage}
        </div>
    )
}