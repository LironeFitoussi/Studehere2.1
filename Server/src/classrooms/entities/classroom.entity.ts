import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ClassroomDocument = Classroom & Document;

@Schema({ 
  collection: 'classrooms',
  timestamps: true,
})
export class Classroom {
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
    ref: 'Building'
  })
  buildingId: string;

  // Virtual populate relationships (defined in schema below)
  building: any;
  courses: any[];
  classSchedules: any[];

  // Timestamps are handled by schema option above
  createdAt: Date;
  updatedAt: Date;
}

export const ClassroomSchema = SchemaFactory.createForClass(Classroom);

// Add virtual populate for relationships
ClassroomSchema.virtual('building', {
  ref: 'Building',
  localField: 'buildingId',
  foreignField: '_id',
  justOne: true
});

ClassroomSchema.virtual('courses', {
  ref: 'Course',
  localField: '_id',
  foreignField: 'classroomId'
});

ClassroomSchema.virtual('classSchedules', {
  ref: 'ClassSchedule',
  localField: '_id',
  foreignField: 'classroomId'
});

// Ensure virtual fields are serialized
ClassroomSchema.set('toJSON', { virtuals: true });
ClassroomSchema.set('toObject', { virtuals: true });
