import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/users/users.schema';

@Schema()
export class ChatId
{
    @Prop({ type: mongoose.Schema.Types.ObjectId, unique: true, ref: 'users' })
      user: mongoose.Types.ObjectId;
      
    @Prop()
      chat_id: string;
 
}

export type ChatIdDocument = HydratedDocument<ChatId>;
export const ChatIdSchema = SchemaFactory.createForClass(ChatId);

