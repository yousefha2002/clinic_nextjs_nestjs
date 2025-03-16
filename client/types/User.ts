export interface User {
    id:number,
    username:string,
    image:string,
    email:string,
    department?:{
        name:string
    },
    birthdate?:string
    role?:string
}