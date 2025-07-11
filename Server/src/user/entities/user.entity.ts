import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ trim: true, unique: true, sparse: true })
  auth0Id?: string;

  @Prop({ required: true, trim: true, default: '' })
  firstName: string;

  @Prop({ required: true, trim: true, default: '' })
  lastName: string;

  @Prop({ required: true, unique: true, trim: true, lowercase: true })
  email: string;

  @Prop({ trim: true, default: '' })
  phone: string;

  @Prop({ trim: true, default: '' })
  address: string;

  @Prop({ trim: true, default: '' })
  city: string;

  @Prop({ trim: true, default: '' })
  state: string;

  @Prop({ trim: true, default: '' })
  zip: string;

  @Prop({ type: String, enum: ['admin', 'user', 'guest'], default: 'guest' })
  role: string;

  @Prop({ type: Types.ObjectId, ref: 'Address', default: null })
  addressDetails: Types.ObjectId;

  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
