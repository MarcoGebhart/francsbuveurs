import IEvent from "@/@types/Event";
import Image from "next/image";
import Link from "next/link";

interface IEventProps {
    event: IEvent;
}

export default function EventsCard({ event }: IEventProps) {
    return (
        <article className="w-3/4 text-black flex flex-col border md:flex-row md:h-[225px]">
            <Link href={`/evenements/${event.slug}`} className="md:w-3/4 h-full">
                <figure className="w-full h-full">
                    <Image
                        src={`/${event.img}.png`}
                        alt={event.title}
                        width={300}
                        height={100}
                        className="object-cover w-full h-full"
                    />
                </figure>
            </Link>
            <section className="md:w-1/2 flex flex-col gap-2 m-2  h-full overflow-y-auto">
                <time 
                    className="text-orange-500 text-xl"
                    dateTime={event.date ? new Date(event.date).toISOString(): undefined}
                >
                    {new Date(event.date).toLocaleDateString()} {event.hour.slice(0,5)}
                </time>
                <h2 className="text-2xl">{event.title}</h2>
                <p className="max-h-[120px] overflow-y-auto">{event.description}</p>
            </section>
        </article>
    );
}
