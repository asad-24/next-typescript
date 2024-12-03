import mongoose, {Schema, Document} from 'mongoose';




 export interface Message extends Document{
    content:string;
    createdAt:Date


}

const MessageSchema:Schema<Message> =new Schema({

content: {
    type:String,
    required:true
},
createdAt:{
    type:Date,
    default:Date.now,
    required:true
}

})


export interface User extends Document{
    userName:string;
    email:string;
    password:string;
    verifyCode:string;
    verifyCodeExpiry:Date;
    isVarified:boolean;
    isAcceptingMessage:boolean;
    messages:Message[];



}
const UserSchema:Schema<User> =new Schema({

    userName: {
        type:String,
        required:[true,"Username is required"],
        trim:true,
        unique:true

    },
    email:{
        type:String,
        required:[true,"Email is required"],
         unique:true,
         match:[/^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,"please ener valid email"],

    },
    password:{
        type:String,
        required:[true,"password is required"],
    },
    verifyCode:{
        type:String,
        required:[true,"verifyCode is required"],
    },
    verifyCodeExpiry:{
        type:Date,
        required:[true,"verifyCodeExpiry is required"],
    },
    isVarified:{
        type:Boolean,
        default:false
    },

    isAcceptingMessage:{
        type:Boolean,
        default:true
    },
    messages:{
        type:[MessageSchema]
    }

    
    })

    const UserModel =(mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema)

    export default UserModel