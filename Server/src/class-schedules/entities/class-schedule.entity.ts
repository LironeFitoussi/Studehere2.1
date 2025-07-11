import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ClassScheduleDocument = ClassSchedule & Document;

@Schema({ 
  collection: 'classSchedules',
  timestamps: true,
})
export class ClassSchedule {
  // MongoDB will auto-generate _id as ObjectId
  _id: Types.ObjectId;

  @Prop({ 
    type: String, 
    required: true,
    ref: 'Course'
  })
  courseId: string;

  @Prop({ 
    type: Boolean,
    default: false
  })
  isDayOff: boolean;

  @Prop({ 
    type: String,
    required: false
  })
  holidayName?: string;

  @Prop({ 
    type: Date,
    required: true
  })
  date: Date;

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
    type: Boolean,
    default: true
  })
  isRemote: boolean;

  @Prop({ 
    type: String,
    required: false,
    ref: 'Classroom'
  })
  classroomId?: string;

  @Prop({ 
    type: Boolean,
    default: false
  })
  isCanceled: boolean;

  @Prop({ 
    type: String,
    required: false
  })
  cancelReason?: string;

  // Array for many-to-many relationship with ExternalInstructor
  @Prop({
    type: [String],
    ref: 'ExternalInstructor',
    default: []
  })
  externalInstructorIds: string[];

  // Virtual populate relationships (defined in schema below)
  course: any;
  classroom: any;
  externalInstructors: any[];
  dailyAttendances: any[];

  // Timestamps are handled by schema option above
  createdAt: Date;
  updatedAt: Date;
}

export const ClassScheduleSchema = SchemaFactory.createForClass(ClassSchedule);

// Add virtual populate for relationships
ClassScheduleSchema.virtual('course', {
  ref: 'Course',
  localField: 'courseId',
  foreignField: '_id',
  justOne: true
});

ClassScheduleSchema.virtual('classroom', {
  ref: 'Classroom',
  localField: 'classroomId',
  foreignField: '_id',
  justOne: true
});

ClassScheduleSchema.virtual('externalInstructors', {
  ref: 'ExternalInstructor',
  localField: 'externalInstructorIds',
  foreignField: '_id'
});

ClassScheduleSchema.virtual('dailyAttendances', {
  ref: 'DailyAttendance',
  localField: '_id',
  foreignField: 'classScheduleId'
});

// Ensure virtual fields are serialized
ClassScheduleSchema.set('toJSON', { virtuals: true });
ClassScheduleSchema.set('toObject', { virtuals: true });
