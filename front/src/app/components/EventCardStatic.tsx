import Image from "next/image";
import Link from "next/link";

export default function EventCardStatic() {
  return (
    <article className="w-3/4 text-black flex flex-col border md:flex-row md:h-[225px]">
      <Link href="/evenements/fete-de-la-biere" className="md:w-3/4 h-full">
        <figure className="w-full h-full">
          <Image
            src="/fetebiere.webp"
            alt="fête de la bière"
            width={300}
            height={100}
            className="object-cover w-full h-full"
          />
        </figure>
      </Link>

      <section className="md:w-1/2 flex flex-col gap-2 m-2 h-full">
        <time className="text-orange-500 text-xl" dateTime="2025-14-08T21:00">
        14/08/2025 21:00
        </time>
        <h2 className="text-2xl">Fête de la Bière</h2>
        <p className="flex-grow">Viens avec nous pour fêter la bière artisanale</p>
      </section>
    </article>
  );
}