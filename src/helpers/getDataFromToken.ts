import { NextRequest } from "next/server";
import  Jwt  from "jsonwebtoken";


export const getDataFromToken = (request: NextRequest) =>{
try {
    const token = request.cookies.get('token')?.value || ''
   const decodedToken:any = Jwt.verify(token, process.env.JWT_TOKEN_KEY!);
   return decodedToken.id
} catch (error) {
    
}
}