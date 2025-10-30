import { Document, Model, model, models, Schema } from "mongoose";
import Event from "./event.model";

export interface IBooking extends Document {
  eventId: Schema.Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: [true, "Event ID is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      validate: {
        validator: function (email: string): boolean {
          // RFC 5322 compliant email validation regex
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(email);
        },
        message: "Please provide a valid email address",
      },
    },
  },
  { timestamps: true }
);

// Create index on eventId for faster queries
BookingSchema.index({ eventId: 1 });

// Pre-save hook to verify referenced event exists
BookingSchema.pre("save", async function (next) {
  try {
    // Verify that the referenced event exists in the database
    const eventExists = await Event.findById(this.eventId);
    
    if (!eventExists) {
      throw new Error(
        `Event with ID ${this.eventId} does not exist. Cannot create booking.`
      );
    }
    
    next();
  } catch (error) {
    next(error as Error);
  }
});

const Booking: Model<IBooking> =models.Booking || model<IBooking>("Booking", BookingSchema);
 
export default Booking;
