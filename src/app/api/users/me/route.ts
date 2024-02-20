import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";

connect();

export async function GET(req: NextRequest, res: NextResponse) {
  try {
   const userId = await getDataFromToken(req);
   const user = await User.findOne({_id: userId}).select('-password');
return NextResponse.json({
    message: 'user Found',
    data: user
})

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
