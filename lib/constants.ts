interface Event {
    id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    image: string;
    category: "conference" | "hackathon" | "meetup";
    url: string;
    organizer: string;
    price: string;
    isVirtual: boolean;
    slug: string;
}

// array of an objects

export const events: Event[] = [
    {
        id: "reactsummit2025",
        title: "React Summit 2025",
        description:
            "The biggest React conference worldwide, featuring talks from core team members and industry experts. Discover the latest React innovations and best practices.",
        date: "November 15-16, 2025",
        time: "13:00 - 22:00 PKT (GMT+5)",
        location: "Amsterdam, Netherlands",
        image: "/images/event1.png",
        category: "conference",
        url: "https://reactsummit.com",
        organizer: "GitNation",
        price: "€599",
        isVirtual: false,
        slug: "react-summit-2025",
    },
    {
        id: "devfest2025",
        title: "DevFest 2025",
        description:
            "Google Developer Groups' largest annual developer conference, covering Android, Web, Cloud, AI/ML, and more.",
        date: "December 5-6, 2025",
        time: "21:00 - 06:00 PKT (GMT+5)",
        location: "San Francisco, CA",
        image: "/images/event2.png",
        category: "conference",
        url: "https://devfest.gdg.org",
        organizer: "Google Developer Groups",
        price: "$299",
        isVirtual: false,
        slug: "devfest-2025-san-francisco",
    },
    {
        id: "ethglobal2025",
        title: "ETHGlobal Istanbul",
        description:
            "The world's largest Ethereum hackathon. Build the future of Web3 with 1000+ hackers, $500K in prizes, and top sponsors from the ecosystem.",
        date: "November 30 - December 2, 2025",
        time: "12:00 - 23:00 PKT (GMT+5)",
        location: "Istanbul, Turkey",
        image: "/images/event3.png",
        category: "hackathon",
        url: "https://ethglobal.com",
        organizer: "ETHGlobal",
        price: "Free for hackers",
        isVirtual: false,
        slug: "ethglobal-istanbul-2025",
    },
    {
        id: "awsreinvent2025",
        title: "AWS re:Invent 2025",
        description:
            "Amazon Web Services' flagship conference featuring hundreds of technical sessions, workshops, and product announcements.",
        date: "December 2-6, 2025",
        time: "22:00 - 07:00 PKT (GMT+5)",
        location: "Las Vegas, NV",
        image: "/images/event4.png",
        category: "conference",
        url: "https://reinvent.awsevents.com",
        organizer: "Amazon Web Services",
        price: "$1,799",
        isVirtual: false,
        slug: "aws-reinvent-2025-las-vegas",
    },
    {
        id: "nextjsconf2025",
        title: "Next.js Conf 2025",
        description:
            "The official Next.js conference by Vercel. Learn about the future of web development and the latest Next.js features.",
        date: "October 30, 2025",
        time: "20:00 - 04:00 PKT (GMT+5)",
        location: "San Francisco, CA",
        image: "/images/event5.png",
        category: "conference",
        url: "https://nextjs.org/conf",
        organizer: "Vercel",
        price: "$499",
        isVirtual: true,
        slug: "nextjs-conf-2025",
    },
    {
        id: "tokyotechmeetup",
        title: "Tokyo Tech Meetup",
        description:
            "Monthly gathering of tech enthusiasts in Tokyo, featuring talks on AI, robotics, and emerging technologies.",
        date: "November 10, 2025",
        time: "16:00 - 19:00 PKT (GMT+5)",
        location: "Tokyo, Japan",
        image: "/images/event6.png",
        category: "meetup",
        url: "https://tokyotech.com/meetup",
        organizer: "Tokyo Tech Community",
        price: "¥2000",
        isVirtual: false,
        slug: "tokyo-tech-meetup-november-2025",
    },
];
