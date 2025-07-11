import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ExternalInstructorDocument = ExternalInstructor & Document;

@Schema({ 
  collection: 'externalInstructors',
  timestamps: true,
})
export class ExternalInstructor {
  // MongoDB will auto-generate _id as ObjectId
  _id: Types.ObjectId;

  @Prop({ 
    type: String, 
    required: true,
    minlength: [2, 'Name has to contain at least 2 characters']
  })
  name: string;

  @Prop({ 
    type: String, 
    required: true,
    unique: true,
    validate: {
      validator: (value: string) => {
        // Basic email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
      },
      message: 'Invalid email format'
    }
  })
  email: string;

  @Prop({ 
    type: String, 
    required: true
  })
  phoneNumber: string;

  @Prop({ 
    type: String, 
    required: true
  })
  profession: string;

  // Array of class schedule IDs for many-to-many relationship
  @Prop({
    type: [String],
    ref: 'ClassSchedule',
    default: []
  })
  classScheduleIds: string[];

  // Virtual populate relationships (defined in schema below)
  classSchedules: any[];

  // Timestamps are handled by schema option above
  createdAt: Date;
  updatedAt: Date;
}

export const ExternalInstructorSchema = SchemaFactory.createForClass(ExternalInstructor);

// Add virtual populate for relationships
ExternalInstructorSchema.virtual('classSchedules', {
  ref: 'ClassSchedule',
  localField: 'classScheduleIds',
  foreignField: '_id'
});

// Ensure virtual fields are serialized
ExternalInstructorSchema.set('toJSON', { virtuals: true });
ExternalInstructorSchema.set('toObject', { virtuals: true });
