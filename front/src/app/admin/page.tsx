'use client'
import { useEffect, useState } from "react";
import EventCreate from "../components/BoCreateEvent";
import IEvent from "@/@types/Event";
import axios, { AxiosError } from "axios";
import { API_URL } from "@/lib/config";
import EventAdmin from "../components/BoEventCard";

export default function Admin() {
    const [eventsData, setEventsData] = useState<IEvent[]>([]);

    const fetchEvent = async () => {
        try {
            const response = await axios.get(`${API_URL}/events`, {withCredentials: true});
            setEventsData(response.data)
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error.message)
            }
        }
    }
    useEffect(() => {
        fetchEvent();
      }, []);
    
    return (
        <div className="flex flex-col items-center text-black p-8 gap-4">
            <h1 className="text-2xl self-center ">BackOffice Admin</h1>
            <div className=" flex flex-col gap-8">
                <nav className="flex gap-4 self-center mt-4">
                    <button className="border border-orange-500 rounded-full p-2">EVENEMENTS</button>
                    <button className="border border-orange-500 rounded-full p-2">BOISSONS</button>
                    <button className="border border-orange-500 rounded-full p-2">SNACK</button>
                </nav>
                <div>
                  <EventCreate onUpdate={fetchEvent}/>  
                </div>
                <div className="flex flex-col gap-4">    
                {eventsData.map((event) => (
                    <EventAdmin
                    key={event.id}       
                    eventId={event.id}   
                    onUpdate={fetchEvent} 
                    />
                ))}
                        
                </div>
            </div>
        </div>
    )
}