import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

type TRole = 'user' | 'admin'

@Schema()
export class User
{
    @Prop({ required: true, unique: true })
      userName: string;
      
    @Prop({ required: true })
      password: string;

    @Prop()
      firstName: string;
    
    @Prop()
      lastName: string;

    @Prop()
      refreshToken: string;

    @Prop()
      role: TRole;

    _id: mongoose.Types.ObjectId;
    

}

// export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);

