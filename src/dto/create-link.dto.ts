import { ApiProperty } from '@nestjs/swagger';

export class CreateLinkDto {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  productLink: string;
}
