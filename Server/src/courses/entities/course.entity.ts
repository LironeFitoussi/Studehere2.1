import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CourseDocument = Course & Document;

// Define the DayOfWeek enum
export enum DayOfWeek {
  Sunday = 'sunday',
  Monday = 'monday',
  Tuesday = 'tuesday',
  Wednesday = 'wednesday',
  Thursday = 'thursday',
  Friday = 'friday',
  Saturday = 'saturday'
}

@Schema({ 
  collection: 'courses',
  timestamps: true,
})
export class Course {
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
    required: false,
    minlength: [2, 'Description has to contain at least 2 characters']
  })
  description?: string;

  @Prop({ 
    type: Date,
    required: true
  })
  startDate: Date;

  @Prop({ 
    type: Date,
    required: true
  })
  endDate: Date;

  @Prop({ 
    type: Date,
    required: true
  })
  startTime: Date;

  @Prop({ 
    type: Date,
    required: true
  })
  endTime: Date;

  @Prop({ 
    type: String,
    required: true,
    ref: 'Classroom'
  })
  classroomId: string;

  @Prop({ 
    type: Number,
    required: true,
    default: 100
  })
  attendanceRadiusMeters: number;

  @Prop({ 
    type: String,
    required: true,
    ref: 'Institution'
  })
  institutionId: string;

  @Prop({ 
    type: [String],
    enum: Object.values(DayOfWeek),
    required: true
  })
  daysOfWeek: DayOfWeek[];

  // Arrays for many-to-many relationships
  @Prop({
    type: [String],
    ref: 'Student',
    default: []
  })
  participantIds: string[];

  @Prop({
    type: [String],
    ref: 'Instructor',
    default: []
  })
  instructorIds: string[];

  // Virtual populate relationships (defined in schema below)
  classroom: any;
  institution: any;
  participants: any[];
  instructors: any[];
  classSchedules: any[];

  // Timestamps are handled by schema option above
  createdAt: Date;
  updatedAt: Date;
}

export const CourseSchema = SchemaFactory.createForClass(Course);

// Add virtual populate for relationships
CourseSchema.virtual('classroom', {
  ref: 'Classroom',
  localField: 'classroomId',
  foreignField: '_id',
  justOne: true
});

CourseSchema.virtual('institution', {
  ref: 'Institution',
  localField: 'institutionId',
  foreignField: '_id',
  justOne: true
});

CourseSchema.virtual('participants', {
  ref: 'Student',
  localField: 'participantIds',
  foreignField: '_id'
});

CourseSchema.virtual('instructors', {
  ref: 'Instructor',
  localField: 'instructorIds',
  foreignField: '_id'
});

CourseSchema.virtual('classSchedules', {
  ref: 'ClassSchedule',
  localField: '_id',
  foreignField: 'courseId'
});

// Ensure virtual fields are serialized
CourseSchema.set('toJSON', { virtuals: true });
CourseSchema.set('toObject', { virtuals: true });
