import { notFound } from "next/navigation";
import Image from "next/image";
import BookEvent from "@/components/BookEvent";
import { getSimilarEventsBySlug } from "@/lib/action/event.action";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
import { IEvent } from "@/database";
import EventCard from "@/components/EventCard";

const EventDetailItem = ({
    alt,
    label,
    icon,
}: {
    alt: string;
    label: string;
    icon: string;
}) => (
    <div className="flex-row-gap-2 items-center">
        <Image src={icon} alt={alt} width={17} height={17}></Image>
        <p>{label}</p>
    </div>
);

const EventAgenda = ({ agendaItems }: { agendaItems: string[] }) => (
    <div className="agenda">
        <h2>Agenda</h2>

        <ul>
            {agendaItems.map((item) => (
                <li key={item}>{item}</li>
            ))}
        </ul>
    </div>
);

const EventTags = ({ tags }: { tags: string[] }) => (
    <div className="flex flex-row-gap-2 flex-wrap">
        {tags.map((tag) => (
            <div className="pill" key={tag}>
                {tag}
            </div>
        ))}
    </div>
);

const EventDetail = async ({
    params,
}: {
    params: Promise<{ slug: string }>;
}) => {
    const { slug } = await params;
    const request = await fetch(`${BASE_URL}/api/events/${slug}`);
    const {
        event: {
            description,
            agenda,
            overview,
            date,
            time,
            location,
            mode,
            audience,
            tags,
            image,
            organizer,
        },
    } = await request.json();

    const booking = 10;

    const similarEvent: IEvent[] = await getSimilarEventsBySlug(slug);

    // if (!event) return notFound();

    return (
        <section id="event">
            <div className="header">
                <h1>Event Description</h1>
                <p className="mt-2">{description}</p>
            </div>

            <div className="details">
                {/* left Side- Event Content */}

                <div className="content">
                    <Image
                        src={image}
                        alt="Event Banner"
                        width={800}
                        height={800}
                        className="banner"
                    ></Image>

                    <section className="flex-col-gap-2">
                        <h2>Overview</h2>
                        <p>{overview}</p>
                    </section>

                    <section className="flex-col-gap-2">
                        <h2>Event Details</h2>

                        <EventDetailItem
                            icon="/icons/calendar.svg"
                            alt="calendar"
                            label={date}
                        />
                        <EventDetailItem
                            icon="/icons/pin.svg"
                            alt="location"
                            label={location}
                        />
                        <EventDetailItem
                            icon="/icons/clock.svg"
                            alt="time"
                            label={time}
                        />
                        <EventDetailItem
                            icon="/icons/mode.svg"
                            alt="mode"
                            label={mode}
                        />
                        <EventDetailItem
                            icon="/icons/audience.svg"
                            alt="audience"
                            label={audience}
                        />
                    </section>

                    <EventAgenda agendaItems={agenda} />

                    <section className="flex-col-gap-2">
                        <h2>About the Organizer</h2>
                        <p>{organizer}</p>
                    </section>

                    <EventTags tags={tags} />
                </div>

                {/* right Side- Event Content */}

                <aside className="booking">
                    <div className="signup-card">
                        <h2>Book Your Spot</h2>
                        {booking > 0 ? (
                            <p className="text-sm">
                                join {booking} people who have already booked
                                their spot
                            </p>
                        ) : (
                            <p className="text-sm">
                                Be first to book your spot!
                            </p>
                        )}
                        <BookEvent />
                    </div>
                </aside>
            </div>

            <div className="w-full flex flex-col gap-4 pt-20">
                <h2>Similar Events</h2>
                <div className="events">
                    {similarEvent.length > 0 &&
                       <EventCard key={similarEvent._id} {...similarEvent} />
                    }
                </div>
            </div>
        </section>
    );
};

export default EventDetail;
