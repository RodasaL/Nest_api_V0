import { Injectable } from '@nestjs/common';
import { updateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
private users = [
    {id: '0', name:'James', type:'Admin'},
    {id: '1', name:'Charles', type:'Func'},
    {id: '2', name:'Richard', type:'Client'},


];

getUsers(){ //sem filtro devolve os users todos
    return this.users;
};

getUsersFuncs(type?: 'Func' | 'Admin'){ //filtro apenas para tipo Func/Admin
if (type){
return this.users.filter((user)=>user.type === type);
}
return this.users;
};

getUsersbyId(id){ //filtro por ID
    if(id){
        return this.users.filter((user)=>user.id == id);
    }
    return this.users;

};

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
    let id_=Number(id);
    this.users.splice(id_,0);
    return this.users;
}
}
