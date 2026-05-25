import DBConnect from "@/lib/connectdb";
import { NextRequest , NextResponse } from "next/server";
import { UserModel } from "@/models/user";


export async function POST(request: NextRequest) {
    try {
       
        await DBConnect()

        const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3days ago from now 

        const inactiveUsers = await UserModel.find({LastRun: {$lt : threeDaysAgo}})

        

        if (inactiveUsers.length === 0) {
            return NextResponse.json({
                message: "No users found which are inactive"
            } , {status: 200})
        }

        // loop 

        // creating a empty object for inactive users (array object)
            const inactiveusersnichesAll: any = {} 

            // looping through the each document of inactive users

            for(const singleInActiveUser of inactiveUsers) {
            // taking subniche of the each user 
            const subniche = singleInActiveUser.subniches // "react" , "next.js" etc....


            // if the  array does not exits of that particular array then create it 
            if (!inactiveusersnichesAll[subniche]) {
                // then create a array for that niche
                inactiveusersnichesAll[subniche] = [] // empty array
            }    

            // pushing the niche of the user in that array
            inactiveusersnichesAll[subniche].push(singleInActiveUser)
            }

           return NextResponse.json({
                message: 'Successfully found inactvie users',
                inactiveusersnichesAll
            } , {status: 200})
            

    } catch (error) {
        console.log("Error while scaanning inactive users")
        return NextResponse.json({
            message: "error while scanning inactive users"
        } , {status: 500})
    }
}