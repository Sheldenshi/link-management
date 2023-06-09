import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLinkDto } from './dto/create-link.dto';
@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}
  getHello(): string {
    return 'Hello World!';
  }
  async findAll(userId: string) {
    return await this.prisma.link.findMany({
      where: {
        userId: userId,
      },
    });
  }

  async create(createLinkDto: CreateLinkDto) {
    console.log(createLinkDto);
    return await this.prisma.link.create({
      data: createLinkDto,
    });
  }

  async updateAndRedirect(id: string) {
    if (isNaN(+id)) {
      throw new HttpException('Invalid link', HttpStatus.BAD_REQUEST);
    }

    const link = await this.prisma.link.update({
      where: {
        id: +id,
      },
      data: {
        clicks: {
          increment: 1,
        },
      },
    });
    // redirect to product url
    // const link = await this.prisma.link.findUnique({
    //   where: {
    //     id: +id,
    //   },
    // });
    return { url: link.productLink };
  }
}
