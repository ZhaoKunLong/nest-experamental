import { Exclude, Expose, Transform, Type, plainToClass } from "class-transformer"

class document {
    fields:string
}



class Event extends document{}


class ExcludeUser extends document{
    @Expose({groups:['admin']})
    email:string;
}

export class Invite extends document{
    @Exclude()
    email:string;

    @Type(()=>ExcludeUser)
    user:ExcludeUser;
}

export class EventRespDTO{
    @Type(()=>Event)
    event:Event

    // @Transform(({value})=> plainToClass(Invite, value))
    @Type(()=>Invite)
    invites: Invite[]

    getInvite(){
        return this.invites[0]
    }
}