import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class User
{
    
    @Prop({ required: true })
      firstName: string;
    
    @Prop()
      lastName: string;

    @Prop()
      password: string;
}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);

