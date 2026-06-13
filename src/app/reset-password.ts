import 'dotenv/config'

import bcrypt from 'bcrypt'
import { UserModel } from '@/models/user'

import DBConnect from '@/lib/connectdb'


async function reset() {
    await DBConnect()
    const newHash = await bcrypt.hash("athashri123", 10)
    const result = await UserModel.updateOne(
        { Email: "athashrikeny10@gmail.com" },
        { password: newHash }
    )
    console.log("updated:", result)
}

reset()