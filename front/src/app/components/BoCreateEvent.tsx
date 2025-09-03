import { useAuth } from "@/context/AuthContext";
import { API_URL } from "@/lib/config";
import axios from "axios";
import { useState } from "react";

function slugify(str: string) {
    return str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-');
};

interface IEventCreateProps {
    onUpdate: () => void;
}

export default function EventCreate({onUpdate}: IEventCreateProps) {
    const {user} = useAuth();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [hour, setHour] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null); // État pour le fichier image
    const [successMessage, setSuccessMessage] = useState('');
    const [isSuccessMessage, setIsSuccessMessage] = useState(true);
    
    const handleCreate = async () => {
        try {
            const slug = slugify(title);
            
            // Création de l'objet FormData
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('date', date);
            formData.append('hour', hour);
            formData.append('slug', slug);
            formData.append('id_app_user', String(user?.id));
            if (imageFile) {
                formData.append('image', imageFile); // 'image' doit correspondre au nom du champ dans Multer
            }

            await axios.post(`${API_URL}/events`, formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data' // Important pour l'envoi de fichiers
                }
            });
            
            // Réinitialisation des états
            setTitle("");
            setDescription("");
            setDate("");
            setHour("");
            setImageFile(null);
            setSuccessMessage('✅ Enregistrement créé avec succès !');
            setIsSuccessMessage(true);
            onUpdate();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setSuccessMessage('❌ Une erreur est survenue lors de l\'enregistrement.');
                setIsSuccessMessage(false);
                console.error('Erreur Axios:', error.response?.data || error.message);
            }
        }
    };

    return (
        <div className="border border-orange-500 rounded p-2">
            <fieldset>
                <div className='flex flex-col items-center md:flex md:flex-row md:items-center justify-center md:gap-4 md:justify-between space-y-4'>
                    <input
                        type="text"
                        className="input text-center md:h-[80] md:m-auto"
                        placeholder='Titre'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea className=" textarea text-center md:m-auto" placeholder='Description' value={description} onChange={(event) => setDescription(event.target.value)} />
                    <input
                        type="file" // Changement du type ici
                        name="image"
                        className="input text-center md:w-40 md:h-[80] md:m-auto"
                        onChange={(event) => {
                            if (event.target.files) {
                                setImageFile(event.target.files[0]); // Stocke l'objet File
                            }
                        }}
                    />
                    <input
                        type="date"
                        className="input text-center md:w-40 md:m-auto"
                        placeholder="Date de l'évènement"
                        value={date}
                        onChange={(event) => {setDate(event.target.value)}}
                    />
                    <input
                        type="time"
                        className="input text-center md:w-40 md:m-auto"
                        placeholder="Heure de l'évènement"
                        value={hour}
                        onChange={(event) => {setHour(event.target.value)}}
                    />
                    
                    <button className="btn rounded border-orange-500 text-3xl text-black" onClick={handleCreate}>+</button>
                </div>   
            </fieldset>
            {successMessage}
        </div>
    );
}