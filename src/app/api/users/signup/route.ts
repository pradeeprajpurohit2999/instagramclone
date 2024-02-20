import {connect} from "@/dbConfig/dbConfig";
import User from '@/models/userModel'
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';

connect()

export async function POST(request : NextRequest){
    try {
         const reqBody = await request.json();
         const { username, email, password } = reqBody;
         
        // if(!username || !email || !password) return new Response('Missing    fields',{status:400}).send("Missing fields");
        // if(!username || !email || !password) return new Response('Missing fields',{status:400}).send("Missing fields");
        // if(!username || !email || !password) return new Response('Missing fields', { status: 400 })

        // Check if user already exists in the database
        const existingUser = await User.findOne({ email });
        

        // check if username already exists in the databse?
        const usernamenotavail = await User.findOne({ username });
        if(existingUser){
            return NextResponse.json({error: "User Already exists"}, {status: 400})
        }
        if (usernamenotavail) {
          return NextResponse.json(
            { error: "Username not available" },
            { status: 400 }
          );
        }

        // hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // create user
        const newuser = new User({
            username,
            email,
            password: hashedPassword,
        })
const savedUser =  await newuser.save()
return NextResponse.json({
    message: "User Crated Sussefully",
    success: true,
    savedUser
})

    } catch (error: any) {
        return NextResponse.json({error: error.message},{status: 500})
    }
}