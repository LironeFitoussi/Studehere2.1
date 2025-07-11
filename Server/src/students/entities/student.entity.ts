import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type StudentDocument = Student & Document;

@Schema({ 
  collection: 'students',
  timestamps: true,
})
export class Student {
  // MongoDB will auto-generate _id as ObjectId
  _id: Types.ObjectId;

  @Prop({ 
    type: String, 
    required: true,
    ref: 'User'
  })
  userId: string;

  @Prop({ 
    type: String, 
    required: true,
    ref: 'Institution'
  })
  institutionId: string;

  @Prop({ 
    type: Boolean, 
    default: true 
  })
  isActive: boolean;

  // Virtual populate relationships (defined in schema below)
  user: any;
  institution: any;
  attendances: any[];
  dailyAttendances: any[];

  // Array of course IDs for many-to-many relationship
  @Prop({
    type: [String],
    ref: 'Course',
    default: []
  })
  courses: string[];

  // Timestamps are handled by schema option above
  createdAt: Date;
  updatedAt: Date;
}

export const StudentSchema = SchemaFactory.createForClass(Student);

// Add virtual populate for relationships
StudentSchema.virtual('user', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
  justOne: true
});

StudentSchema.virtual('institution', {
  ref: 'Institution',
  localField: 'institutionId',
  foreignField: '_id',
  justOne: true
});

StudentSchema.virtual('attendances', {
  ref: 'AttendanceRecord',
  localField: '_id',
  foreignField: 'studentId'
});

StudentSchema.virtual('dailyAttendances', {
  ref: 'DailyAttendance',
  localField: '_id',
  foreignField: 'studentId'
});

// Ensure virtual fields are serialized
StudentSchema.set('toJSON', { virtuals: true });
StudentSchema.set('toObject', { virtuals: true });
