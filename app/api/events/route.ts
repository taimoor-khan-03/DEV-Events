import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

import connectDB from "@/lib/mongodb";
import Event from "@/database/event.model";

// export async function POST(req: NextRequest) {
//     try {
//         await connectDB();

//         const formData = await req.formData();

//         let event;

//         try {
//             event = Object.fromEntries(formData.entries());
//         } catch (e) {
//             return NextResponse.json(
//                 { message: "Invalid JSON data format" },
//                 { status: 400 }
//             );
//         }

//         const file = formData.get("image") as File;

//         if (!file) {
//             return NextResponse.json(
//                 { message: "Image file is required" },
//                 { status: 400 }
//             );
//         }

//         const arrayBuffer = await file.arrayBuffer();
//         const buffer = Buffer.from(arrayBuffer);

//         const uploadResult = await new Promise((resolve, reject) => {
//             cloudinary.uploader.upload_stream({resource_type: 'image' , folder: 'DEV Event'}, (error, results) => {
//                 if(error) return reject(error);

//                 resolve(results);
//             }).end(buffer)
//         });

//         event.image = (uploadResult as {secure_url: string}).secure_url;

//         const CreatedEvent = await Event.create({...event,
//             tags: tags,
//             agenda: agenda,
//         });

//         return NextResponse.json(
//             { message: "Event created successfully", event: CreatedEvent },
//             { status: 201 }
//         );
//     } catch (e) {
//         console.error(e);
//         return NextResponse.json({
//             message: "Event creation",
//             error: e instanceof Error ? e.message : "unknown",
//         });
//     }
// }

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const formData = await req.formData();

        // 1. Get the simple key/value pairs
        const event = Object.fromEntries(formData.entries());

        // 2. Safely extract and remove complex fields (like tags/agenda) if needed,
        //    or ensure they are properly formatted.
        //    For example, if tags/agenda are expected to be arrays (but come as strings from formData):
        const tags = event.tags
            ? (event.tags as string).split(",").map((tag) => tag.trim())
            : [];
        const agenda = event.agenda
            ? (event.agenda as string).split("\n").map((item) => item.trim())
            : [];

        const file = formData.get("image") as File;

        if (!file) {
            return NextResponse.json(
                { message: "Image file is required" },
                { status: 400 }
            );
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploadResult = await new Promise((resolve, reject) => {
            cloudinary.uploader
                .upload_stream(
                    { resource_type: "image", folder: "DEV Event" },
                    (error, results) => {
                        if (error) return reject(error);
                        resolve(results);
                    }
                )
                .end(buffer);
        });

        event.image = (uploadResult as { secure_url: string }).secure_url;

        // 3. Use the DEFINED variables in the create call
        // Before Event.create, you would add a check:
        let finalSlug = event.slug;
        let count = 0;

        // Loop until a unique slug is found
        while (await Event.findOne({ slug: finalSlug })) {
            count++;
            finalSlug = `${event.slug}-${count}`;
        }

        // Use the unique slug for creation
        const CreatedEvent = await Event.create({
            ...event,
            slug: finalSlug, // <-- Use the final unique slug
            tags: tags,
            agenda: agenda,
        });
        return NextResponse.json(
            { message: "Event created successfully", event: CreatedEvent },
            { status: 201 }
        );
    } catch (e) {
        console.error(e);
        // ... (rest of error handling)
    }
}

export async function GET() {
    try {
        await connectDB();

        const events = await Event.find().sort({ createdAt: -1 });

        return NextResponse.json({
            message: "Event list successfully",
            events,
        });
    } catch (e) {
        return NextResponse.json(
            { message: "Event fetching failed", error: e },
            { status: 500 }
        );
    }
}

// slug route
