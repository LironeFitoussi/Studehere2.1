import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type AttendanceRecordDocument = AttendanceRecord & Document;

// Define the CheckInPeriod enum
export enum CheckInPeriod {
  Start = 'start',
  Middle = 'middle',
  End = 'end'
}

// Define the AttendanceStatus enum
export enum AttendanceStatus {
  Present = 'present',
  Absent = 'absent',
  Late = 'late',
  Excused = 'excused'
}

@Schema({ 
  collection: 'attendanceRecords',
  timestamps: true,
})
export class AttendanceRecord {
  // MongoDB will auto-generate _id as ObjectId
  _id: Types.ObjectId;

  @Prop({ 
    type: String, 
    required: true,
    ref: 'Student'
  })
  studentId: string;

  @Prop({ 
    type: String, 
    required: true,
    ref: 'Course'
  })
  courseId: string;

  @Prop({ 
    type: String, 
    required: true,
    ref: 'DailyAttendance'
  })
  dailyAttendanceId: string;

  @Prop({ 
    type: String,
    enum: Object.values(CheckInPeriod),
    required: true
  })
  checkInPeriod: CheckInPeriod;

  @Prop({ 
    type: String,
    enum: Object.values(AttendanceStatus),
    default: AttendanceStatus.Absent
  })
  status: AttendanceStatus;

  @Prop({ 
    type: Number,
    required: true
  })
  latitude: number;

  @Prop({ 
    type: Number,
    required: true
  })
  longitude: number;

  // Virtual populate relationships (defined in schema below)
  student: any;
  course: any;
  dailyAttendance: any;

  // Timestamps are handled by schema option above
  createdAt: Date;
  updatedAt: Date;
}

export const AttendanceRecordSchema = SchemaFactory.createForClass(AttendanceRecord);

// Add virtual populate for relationships
AttendanceRecordSchema.virtual('student', {
  ref: 'Student',
  localField: 'studentId',
  foreignField: '_id',
  justOne: true
});

AttendanceRecordSchema.virtual('course', {
  ref: 'Course',
  localField: 'courseId',
  foreignField: '_id',
  justOne: true
});

AttendanceRecordSchema.virtual('dailyAttendance', {
  ref: 'DailyAttendance',
  localField: 'dailyAttendanceId',
  foreignField: '_id',
  justOne: true
});

// Ensure virtual fields are serialized
AttendanceRecordSchema.set('toJSON', { virtuals: true });
AttendanceRecordSchema.set('toObject', { virtuals: true });
