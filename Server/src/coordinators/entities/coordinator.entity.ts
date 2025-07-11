import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CoordinatorDocument = Coordinator & Document;

@Schema({ 
  collection: 'coordinators',
  timestamps: true,
})
export class Coordinator {
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

  // Virtual populate relationships (defined in schema below)
  user: any;
  institution: any;

  // Timestamps are handled by schema option above
  createdAt: Date;
  updatedAt: Date;
}

export const CoordinatorSchema = SchemaFactory.createForClass(Coordinator);

// Add virtual populate for relationships
CoordinatorSchema.virtual('user', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
  justOne: true
});

CoordinatorSchema.virtual('institution', {
  ref: 'Institution',
  localField: 'institutionId',
  foreignField: '_id',
  justOne: true
});

// Ensure virtual fields are serialized
CoordinatorSchema.set('toJSON', { virtuals: true });
CoordinatorSchema.set('toObject', { virtuals: true });
