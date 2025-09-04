
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { API_URL } from "@/lib/config";
import axios from "axios";

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

interface IEventAdminProps {
  eventId: number;
  onUpdate: () => void;
}

export default function EventAdmin({ eventId, onUpdate }: IEventAdminProps) {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [hour, setHour] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [message, setMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatDateForInput = (isoDate: string) => {
    if (!isoDate) return "";
    return isoDate.split("T")[0]; // -> "2026-02-14"
  };
  // Charger l'événement existant
  useEffect(() => {
    axios.get(`${API_URL}/events/${eventId}`)
      .then(res => {
        const event = res.data;
        setTitle(event.title);
        setDescription(event.description);
        setDate(formatDateForInput(event.date));
        setHour(event.hour);
        setImagePreview(event.img || ""); // Utilise le champ img
      })
      .catch(err => console.error(err));
  }, [eventId]);

  const handleUpdate = async () => {
    try {
        const slug = slugify(title);
        const formData = new FormData();
        if (title) formData.append("title", title);
        if (description) formData.append("description", description);
        if (date) formData.append("date", date); // ZodCoercedDate accepte YYYY-MM-DD
        if (hour) formData.append("hour", hour);
        if (slug) formData.append("slug", slug);
        if (user?.id) formData.append("id_app_user", String(user.id));
        if (imageFile) formData.append("img", imageFile);

        for (const pair of formData.entries()) {
            console.log(pair[0], pair[1]);
          }

      await axios.patch(`${API_URL}/events/${eventId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      setMessage("✅ Événement mis à jour avec succès !");
      if (fileInputRef.current) fileInputRef.current.value = "";
      setImageFile(null);
      onUpdate();
    } catch (err) {
      console.error(err);
      setMessage("❌ Une erreur est survenue lors de la mise à jour.");
    }
  };

  const handleDelete = async () => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet événement ?")) return;

    try {
      await axios.delete(`${API_URL}/events/${eventId}`, { withCredentials: true });
      setMessage("🗑️ Événement supprimé avec succès !");
      onUpdate();
    } catch (err) {
      console.error(err);
      setMessage("❌ Une erreur est survenue lors de la suppression.");
    }
  };

  return (
    <div className="border p-4 rounded space-y-4">
      <h2 className="text-lg font-bold">{title}</h2>

      <input
        type="text"
        className="input w-full"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Titre"
      />
      <textarea
        className="textarea w-full"
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Description"
      />
      <input
        type="date"
        className="input"
        value={date}
        onChange={e => setDate(e.target.value)}
      />
      <input
        type="time"
        className="input"
        value={hour}
        onChange={e => setHour(e.target.value)}
      />
      <input
        type="file"
        ref={fileInputRef}
        className="input"
        onChange={e => {
          if (e.target.files) {
            setImageFile(e.target.files[0]);
            setImagePreview(URL.createObjectURL(e.target.files[0]));
          }
        }}
      />
      
      <div className="flex gap-2 mt-2">
        <button className="btn btn-primary" onClick={handleUpdate}>Mettre à jour</button>
        <button className="btn btn-error" onClick={handleDelete}>Supprimer</button>
      </div>

      {message && <p>{message}</p>}
    </div>
  );
}
