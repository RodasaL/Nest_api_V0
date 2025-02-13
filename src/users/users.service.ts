import { Injectable, NotFoundException } from '@nestjs/common';
import { updateUserDto } from './dto/update-user.dto';
import { error } from 'console';

@Injectable()
export class UsersService {
private users = [
    {id: '0', name:'James', type:'Admin'},
    {id: '1', name:'Charles', type:'Func'},
    {id: '2', name:'Richard', type:'Client'},


];

getUsers(){ //sem filtro devolve os users todos
    let UReturn:{[key:string] : any}[] = [];
    UReturn = this.users;
    if(UReturn.length > 0){
    return this.users;
    }else{
        throw new Error('Nao existem users')
    }  
};

getUsersFuncs(type?: 'Func' | 'Admin'){ //filtro apenas para tipo Func/Admin
    let UReturn: { id: string; name: string; type: string; }[] = [];

    
if (type){
 UReturn = this.users.filter((user)=>user.type == type);
 
}
if(UReturn.length > 0){
return UReturn;
}else{
    throw new Error('User not found with the filter')
}
};

getUsersbyId(id){ //filtro por ID
   
    const UReturn = this.users.find((user)=>user.id == id);
    if(!UReturn){
        throw new Error('User not found');
    }
    
    return UReturn;
}

updateUser(id: string, updateUserDto: updateUserDto){
    this.users = this.users.map((user) =>{
        if (user.id == id){
            return{ ...user, ...updateUserDto} //subscreve as informacoes de user(todo daí o ...) que sao compativeis com as enviadas(...updateUserDto)
        }
        return user;
    });
    return this.getUsersbyId(id);
}


createUser(newUser){
this.users.push(newUser);
return newUser;
}

deleteByID(id: string){
    const index = this.users.findIndex(user => user.id === id);
    /*
    if (index === -1) {
        throw new Error('User not found');
    }
    */
    this.users.splice(index, 1); // Remove 1 elemento no índice encontrado
    return this.users;
}
}
