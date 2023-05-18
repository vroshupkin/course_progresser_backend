import { ApiProperty } from '@nestjs/swagger';


export class NotifyReqDto
{
  @ApiProperty({ example: '1254478782' })
    chat_id: string;
  @ApiProperty({ example: 'hello user' })
    message: string;
}

export class NotifyRegisterDto
{
  @ApiProperty({ example: '1254' })
    chat_id: string;
  @ApiProperty({ example: 'vroshupkin' })
    userName: string;
}

