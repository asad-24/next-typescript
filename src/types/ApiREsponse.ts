import {Message} from "@/models/user"
export interface ApiResponse {
message:string;
success:boolean;
isAcceptingMessage?:boolean;
messages?:Array<Message>
}