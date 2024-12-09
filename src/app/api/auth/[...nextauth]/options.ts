import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dpConnect";
import UserModel from "@/models/user";
import { error } from 'console';

// Define the authentication options
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials:any):Promise<any> {

        await dbConnect();
        try{
          const user=  await UserModel.findOne({
                $or:[
                    {email:credentials.identifier},
                    {userName:credentials.identifier}
                ]
            })

            if(!user){
                throw new Error("no user found with this email")
            }
            if(!user.isVarified){
                throw new Error("please verify user acount first")
            }

           const isCorrectPassword= await bcrypt.compare(credentials.password, user.password);
           if(isCorrectPassword){
            return user
           }
           else{
            throw new Error("your password is  incorrect")
           }
        }catch(err:any){

            throw new Error(err)
        }

      }
    }),
  ],
  callbacks:{

    async session({ session,  token }) {
        return session
      },
      async jwt({ token, user,  }) {

        if(!user){
            token._id= user._id.toString();
                }
        return token


      }
  },

  pages:{
    signIn: '/sign-in',
  },
  session:{
    strategy:"jwt"
  },
  secret: process.env.NEXTAUTH_SECRET
};
