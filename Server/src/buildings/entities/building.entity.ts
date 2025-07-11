import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type BuildingDocument = Building & Document;

@Schema({ 
  collection: 'buildings',
  timestamps: true,
})
export class Building {
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
    ref: 'Address'
  })
  addressId: string;

  @Prop({ 
    type: Number,
    required: true
  })
  radiusMeters: number;

  @Prop({ 
    type: String, 
    required: true,
    ref: 'Institution'
  })
  institutionId: string;

  // Virtual populate relationships (defined in schema below)
  institution: any;
  address: any;
  classrooms: any[];

  // Timestamps are handled by schema option above
  createdAt: Date;
  updatedAt: Date;
}

export const BuildingSchema = SchemaFactory.createForClass(Building);

// Add virtual populate for relationships
BuildingSchema.virtual('institution', {
  ref: 'Institution',
  localField: 'institutionId',
  foreignField: '_id',
  justOne: true
});

BuildingSchema.virtual('address', {
  ref: 'Address',
  localField: 'addressId',
  foreignField: '_id',
  justOne: true
});

BuildingSchema.virtual('classrooms', {
  ref: 'Classroom',
  localField: '_id',
  foreignField: 'buildingId'
});

// Ensure virtual fields are serialized
BuildingSchema.set('toJSON', { virtuals: true });
BuildingSchema.set('toObject', { virtuals: true });
