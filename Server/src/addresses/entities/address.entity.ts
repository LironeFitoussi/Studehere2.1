import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type AddressDocument = Address & Document;

@Schema({ 
  collection: 'addresses',
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})
export class Address {
  // MongoDB will auto-generate _id as ObjectId
  _id: Types.ObjectId;

  @Prop({ 
    type: String, 
    required: true
  })
  street: string;

  @Prop({ 
    type: String, 
    required: true
  })
  city: string;

  @Prop({ 
    type: String, 
    required: true
  })
  state: string;

  @Prop({ 
    type: String, 
    required: true
  })
  country: string;

  @Prop({ 
    type: String,
    required: false
  })
  zip?: string;

  @Prop({ 
    type: Number,
    required: true
  })
  lat: number;

  @Prop({ 
    type: Number,
    required: true
  })
  lng: number;

  @Prop({ 
    type: String,
    required: false
  })
  formatted_address?: string;

  @Prop({ 
    type: String,
    required: false
  })
  hebrew_address?: string;

  // Timestamps are handled by schema option above
  created_at: Date;
  updated_at: Date;
}

export const AddressSchema = SchemaFactory.createForClass(Address);

// Ensure proper serialization
AddressSchema.set('toJSON', { virtuals: true });
AddressSchema.set('toObject', { virtuals: true });
