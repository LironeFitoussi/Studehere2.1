import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type InstitutionDocument = Institution & Document;

// Define the InstitutionType enum
export enum InstitutionType {
  School = 'school',
  University = 'university',
  College = 'college',
  TrainingCenter = 'training_center',
  Other = 'other'
}

@Schema({ 
  collection: 'institutions',
  timestamps: true,
})
export class Institution {
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
    unique: true
  })
  institution_code: string;

  @Prop({ 
    type: String, 
    required: true,
    minlength: [2, 'Hebrew name has to contain at least 2 characters']
  })
  hebrew_name: string;

  @Prop({ 
    type: String, 
    required: true,
    unique: true
  })
  slug: string;

  @Prop({ 
    type: String,
    enum: Object.values(InstitutionType),
    default: InstitutionType.Other
  })
  institution_type: InstitutionType;

  @Prop({ 
    type: String, 
    required: true,
    ref: 'Address'
  })
  address_id: string;

  // Virtual populate relationships (defined in schema below)
  principals: any[];
  students: any[];
  instructors: any[];
  coordinators: any[];
  buildings: any[];
  courses: any[];

  // Timestamps are handled by schema option above
  createdAt: Date;
  updatedAt: Date;
}

export const InstitutionSchema = SchemaFactory.createForClass(Institution);

// Add virtual populate for relationships
InstitutionSchema.virtual('principals', {
  ref: 'Principal',
  localField: '_id',
  foreignField: 'institutionId'
});

InstitutionSchema.virtual('students', {
  ref: 'Student',
  localField: '_id',
  foreignField: 'institutionId'
});

InstitutionSchema.virtual('instructors', {
  ref: 'Instructor',
  localField: '_id',
  foreignField: 'institutionId'
});

InstitutionSchema.virtual('coordinators', {
  ref: 'Coordinator',
  localField: '_id',
  foreignField: 'institutionId'
});

InstitutionSchema.virtual('buildings', {
  ref: 'Building',
  localField: '_id',
  foreignField: 'institutionId'
});

InstitutionSchema.virtual('courses', {
  ref: 'Course',
  localField: '_id',
  foreignField: 'institutionId'
});

// Ensure virtual fields are serialized
InstitutionSchema.set('toJSON', { virtuals: true });
InstitutionSchema.set('toObject', { virtuals: true });
