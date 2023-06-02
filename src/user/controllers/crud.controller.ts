import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entites/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';

@Controller('mng/user')
export class CrudController {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    @Get()
    list(): Promise<User[]> {
        return this.userRepository.find();
    }

    @Get(':id')
    show(@Param('id') id: string): Promise<User> {
        return this.userRepository.findOneByOrFail({id: +id});
    }

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        console.log(createUserDto, 'asd');
    }
}
