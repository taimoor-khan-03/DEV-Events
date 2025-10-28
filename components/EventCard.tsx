"use client";

import Link from "next/link";
import Image from "next/image";
import { time } from "console";

interface Props {
    title: string;
    description: string;
    date: string;
    location: string;
    image: string;
    category: "conference" | "hackathon" | "meetup";
    organizer: string;
    price: string;
    time: string;
    slug: string;
}

const EventCard = ({
    title,
    image,
    date,
    description,
    location,
    category,
    organizer,
    price,
    slug,
    time
}: Props) => {
    return (
        <Link href={`/events/${slug}`} id="event-card">
            <Image
                src={image}
                alt={title}
                width={410}
                height={300}
                className="poster"
            />

            <div className="flex flex-row gap-2">
                <Image
                    src="/icons/pin.svg"
                    alt="location"
                    width={14}
                    height={14}
                ></Image>
                <p>{location}</p>
            </div>

            <p className="title">{title}</p>

            <div className="datetime">
                <div>
                    <Image
                        src="/icons/calendar.svg"
                        alt="date"
                        width={14}
                        height={14}
                    ></Image>
                    <p>{date}</p>
                </div>
                <div>
                    <Image
                        src="/icons/clock.svg"
                        alt="time"
                        width={14}
                        height={14}
                    ></Image>
                    <p>{time}</p>
                </div>
            </div>
        </Link>
    );
};

export default EventCard;
