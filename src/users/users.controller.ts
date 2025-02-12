import { Controller, Get,Post,Delete,Put, Param, Body, Query } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { updateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';


@Controller('users')
export class UsersController {
constructor(private readonly usersservice: UsersService){}

/******************************************************************/

//GET /Users --> [] //All Users
@Get()
getUsers(){
    return this.usersservice.getUsers();
};

/******************************************************************/

//GET /users/filter?type=Admin
@Get('filter') //diferenciar a rota
getUsersFuncs(@Query('type') type: 'Admin' | 'Func'){
    return this.usersservice.getUsersFuncs(type);
};

/******************************************************************/

//GET /Users/Id -->{...} get user by id 
@Get(':id')
getOneUser(@Param('id') id: string){
    return this.usersservice.getUsersbyId(id);
}

/******************************************************************/

//POST /Users/create  Add a User with the info from the body
@Post('create')
createUser(@Body() CreateUserDto: CreateUserDto){
    const newUser = {
        ...CreateUserDto,
        id: Date.now(),
    }
    this.usersservice.createUser(newUser);

    return newUser;
}


/******************************************************************/


//PUT /Users/:ID -->{...}
@Put(':id')
updateUser(@Param('id') id: string, @Body()  updateUserDto: updateUserDto){
    return this.usersservice.updateUser(id,updateUserDto);
    
}

/******************************************************************/

//DELETE /Users/:ID  Delete a User 
@Delete(':id')
removeUser(@Param('id') id: string){
    this.usersservice.deleteByID(id)
    return this.usersservice.getUsers();;
}
}