import { Hobby } from "./hobby.model";

export class User{

    constructor(
        public name:string,
        public sname:string,
        public birthDate:Date,
        public technology:string,
        public version:string,
        public email:string,
        public hobby:Hobby,
    ){
        this.name = name;
        this.sname = sname;
        this.birthDate = birthDate;
        this.technology = technology;
        this.version = version;
        this.email = email;
        this.hobby = hobby;

    }

}