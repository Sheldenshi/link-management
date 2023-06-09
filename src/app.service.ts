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
    // increase number of clicks for link that are active, else redirect to home page
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

    if (!link.active) {
      return { url: 'http://localhost:3000' };
    }

    return { url: link.productLink };
  }

  async deactivate(id: string) {
    if (isNaN(+id)) {
      throw new HttpException('Invalid link', HttpStatus.BAD_REQUEST);
    }
    const res = await this.prisma.link.update({
      where: {
        id: +id,
      },
      data: {
        active: false,
      },
    });

    if (!res) {
      throw new HttpException('Link not found', HttpStatus.NOT_FOUND);
    }

    return res;
  }
}
