import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type DailyAttendanceDocument = DailyAttendance & Document;

// Define the DailyStatus enum
export enum DailyStatus {
  Present = 'present',
  Absent = 'absent',
  Late = 'late',
  Excused = 'excused'
}

@Schema({ 
  collection: 'dailyAttendances',
  timestamps: true,
})
export class DailyAttendance {
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
    ref: 'ClassSchedule'
  })
  classScheduleId: string;

  @Prop({ 
    type: String,
    enum: Object.values(DailyStatus),
    default: DailyStatus.Absent
  })
  dailyStatus: DailyStatus;

  // Virtual populate relationships (defined in schema below)
  student: any;
  classSchedule: any;
  attendances: any[];

  // Timestamps are handled by schema option above
  createdAt: Date;
  updatedAt: Date;
}

export const DailyAttendanceSchema = SchemaFactory.createForClass(DailyAttendance);

// Add virtual populate for relationships
DailyAttendanceSchema.virtual('student', {
  ref: 'Student',
  localField: 'studentId',
  foreignField: '_id',
  justOne: true
});

DailyAttendanceSchema.virtual('classSchedule', {
  ref: 'ClassSchedule',
  localField: 'classScheduleId',
  foreignField: '_id',
  justOne: true
});

DailyAttendanceSchema.virtual('attendances', {
  ref: 'AttendanceRecord',
  localField: '_id',
  foreignField: 'dailyAttendanceId'
});

// Ensure virtual fields are serialized
DailyAttendanceSchema.set('toJSON', { virtuals: true });
DailyAttendanceSchema.set('toObject', { virtuals: true });
