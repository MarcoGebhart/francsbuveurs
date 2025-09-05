'use client'

import IEvent from "@/@types/Event";
import axios from "axios";
import { useEffect, useState } from "react";
import EventsCard from "../components/EventsCard";
import { API_URL } from "@/lib/config";


export default function Events() {
    const [eventsData, setEventsData] = useState<IEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [errorEvents, setErrorEvents] = useState('');

    useEffect(() => {
        const fetchEvent = async() => {
            try {
                const response = await axios.get(`${API_URL}/events`,
                    {withCredentials: true}
                );
                console.log(response);
                setEventsData(response.data);
                setLoading(false);
            } catch (error) {
                if (axios.isAxiosError(error)){
                    setErrorEvents(error.message);
                }
            }
        };
        fetchEvent();
    },[])

    if (loading) {
        return (
          <div className="flex items-center justify-center h-150 text-white min-h-screen">
            <span className="ml-4 text-black font-medium">Chargement des événements...</span>
          </div>
        );
    };
    if (errorEvents) {
        return (
            <div>
                <p>Pas d&apos;évènement trouvés</p>
            </div>
        )
    }
    return(
        <div className="text-black flex flex-col items-center gap-8 p-8">
            <h1 className="text-2xl">LES ÉVÉNEMENTS</h1>
            <div className="flex flex-col items-center gap-8">
                {eventsData.map((event) => (
                <EventsCard key={event.id} event={event}/>   
                ))}
            </div>
        </div>
    )
}