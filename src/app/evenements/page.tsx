'use client'

import IEvent from "@/@types/Event";
import axios from "axios";
import { useEffect, useState } from "react";
import EventsCard from "../components/EventsCard";


export default function Events() {
    const [eventsData, setEventsData] = useState<IEvent[]>([]);
    const [laoding, setLaoding] = useState(true);
    const [errorEvents, setErrorEvents] = useState('');

    useEffect(() => {
        const fetchEvent = async() => {
            try {
                const response = await axios.get('http://localhost:5000/events',
                    {withCredentials: true}
                );
                console.log(response);
                setEventsData(response.data);
                setLaoding(false);
            } catch (error) {
                if (axios.isAxiosError(error)){
                    setErrorEvents(error.message);
                }
            }
        };
        fetchEvent();
    },[])

    if (laoding) {
        return (
          <div className="flex items-center justify-center h-150 text-white min-h-screen">
            <span className="ml-4 text-black font-medium">Chargement des infos...</span>
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
        <div className="flex flex-col items-center gap-8 m-8">
            <h1 className="text-2xl">LES ÉVÉNEMENTS</h1>
            <div className="flex flex-col items-center gap-8">
                {eventsData.map((event) => (
                <EventsCard key={event.id} event={event}/>   
                ))}
            </div>
        </div>
    )
}