import { Controller, Get,Post,Delete,Put, Param, Body, Query, NotFoundException } from '@nestjs/common';
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
    try{
    return this.usersservice.getUsers();
    }catch(err){
        throw new NotFoundException();
    }
};

/******************************************************************/

//GET /users/filter?type=Admin
@Get('filter') //diferenciar a rota
getUsersFuncs(@Query('type') type: 'Admin' | 'Func'){
    try{
    return this.usersservice.getUsersFuncs(type);
    }catch(err){
        throw new NotFoundException();
    }
};

/******************************************************************/

//GET /Users/Id -->{...} get user by id 
@Get(':id')
getOneUser(@Param('id') id: string){
    try{
    return this.usersservice.getUsersbyId(id);
}catch(err){
    throw new NotFoundException();
}
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
    try{
    return this.usersservice.updateUser(id,updateUserDto);
}catch(Error){
    throw new NotFoundException();
}
    
}

/******************************************************************/

//DELETE /Users/:ID  Delete a User 
@Delete(':id')
removeUser(@Param('id') id: string){
    this.usersservice.deleteByID(id)
  
    return this.usersservice.getUsers();

}
}