import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Event, { type IEvent } from "@/database/event.model";

// GET /api/events/[slug] - Fetch a single event by slug
export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug: paramSlug } = await context.params;
    const rawSlug = paramSlug;

    // Basic validation: slug must be a non-empty, URL-safe string
    if (!rawSlug || typeof rawSlug !== "string") {
      return NextResponse.json(
        { message: "Missing or invalid 'slug' parameter" },
        { status: 400 }
      );
    }

    const slug = rawSlug.trim().toLowerCase();
    const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/; // e.g., dev-event-2025
    if (!SLUG_REGEX.test(slug)) {
      return NextResponse.json(
        { message: "Invalid slug format. Use lowercase letters, numbers, and hyphens only" },
        { status: 400 }
      );
    }

    await connectDB();

    // Fetch event by slug and exclude internal fields
    const event: IEvent | null = await Event.findOne({ slug })
      .select("-__v")
      .exec();

    if (!event) {
      return NextResponse.json(
        { message: "Event not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ event }, { status: 200 });
  } catch {
    // Avoid leaking internal error details to the client
    return NextResponse.json(
      { message: "Unexpected error while fetching event" },
      { status: 500 }
    );
  }
}
