import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PrincipalDocument = Principal & Document;

@Schema({ 
  collection: 'principals',
  timestamps: true,
})
export class Principal {
  // MongoDB will auto-generate _id as ObjectId
  _id: Types.ObjectId;

  @Prop({ 
    type: String, 
    required: false,
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

export const PrincipalSchema = SchemaFactory.createForClass(Principal);

// Add virtual populate for relationships
PrincipalSchema.virtual('user', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
  justOne: true
});

PrincipalSchema.virtual('institution', {
  ref: 'Institution',
  localField: 'institutionId',
  foreignField: '_id',
  justOne: true
});

// Ensure virtual fields are serialized
PrincipalSchema.set('toJSON', { virtuals: true });
PrincipalSchema.set('toObject', { virtuals: true });
