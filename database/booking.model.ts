import mongoose, { Schema, model, models, Document, Types } from 'mongoose';

/**
 * TypeScript interface for Booking document
 */
export interface IBooking extends Document {
  eventId: Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Booking Schema Definition
 */
const BookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: [true, 'Event ID is required'],
      index: true, // Index for faster event-based queries
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
      validate: {
        validator: function (v: string) {
          // Email validation regex
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: 'Please provide a valid email address',
      },
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt
  }
);

/**
 * Pre-save hook to validate that the referenced Event exists
 */
BookingSchema.pre('save', async function () {
  // Only validate eventId if it's modified or the document is new
  if (this.isModified('eventId') || this.isNew) {
    // Dynamically import Event model to avoid circular dependency
    const Event = mongoose.models.Event || (await import('./event.model')).default;

    const eventExists = await Event.findById(this.eventId);

    if (!eventExists) {
      throw new Error(`Event with ID ${this.eventId} does not exist`);
    }
  }
});

/**
 * Export Booking model
 * Prevents model recompilation in development (Next.js hot reload)
 */
const Booking = models.Booking || model<IBooking>('Booking', BookingSchema);

export default Booking;
