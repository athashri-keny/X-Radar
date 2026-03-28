import { NextResponse , NextRequest } from "next/server";
import { SendAccessReadyEmail } from "@/helpers/Send-Early-accesslink-To-user";


const earlyAcccessUser = [
    {
        Email: 'suhailroushan13@gmail.com',
        niche: "web-development"
    }, 
    {
        Email: 'ytnn13@gmail.com',
        niche: 'data-science'
    }, 
    {
        Email: 'gio@hh.tc',
        niche: 'web-development'
    }, 
    {
        Email: 'thomaslijin84@gmail.com',
        niche: 'social-media',
    }, 
    {
        Email: 'adeyemotunbosun20@gmail.com',
        niche: 'virtual-assistant'
    },
    {
        Email: 'kevalrabari.info.88@gmail.com',
        niche: 'video-editing'
    },
    {
        Email: 'hiruyma@gmail.com',
        niche: 'video-editing'
    },
    {
        Email: 'athashrikeny10@gmail.com',
        niche: 'web-development'
    }
]

export async  function POST(request: NextRequest) {
    try {
        
        for(const SingleUser of earlyAcccessUser) {
            await SendAccessReadyEmail(SingleUser.Email , SingleUser.niche)
            console.log(`Send email to user ${SingleUser.Email}`)
        }

  return NextResponse.json({ 
    message: `✅ Sent to ${earlyAcccessUser.length} users` 
  })


    } catch (error) {
        console.log("Error while sending email to user")
        return NextResponse.json({
            message:"Error while sending the email"
        } , {status: 500})
    }
}