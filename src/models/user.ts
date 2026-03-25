import mongoose , {Schema , Document} from "mongoose";



// struture 
export interface User extends Document{
    Name: string,
    Email: string,
    password: string,
    verifycode: string,
    verifyCodeExpiry: Date,
    isVerifiedEmail?: boolean
     // need to add pricing 
}


const UserSchema = new Schema<User>({
    Name: {
        type: String,
        required: [true , "Name is required!"]
    },
    Email: {
        type: String,
        required: [true , "Email is required!"],
        unique: true
    },
    password: {
        type: String,
        required: [true , "Passsword is requireed!"]
    },
    verifycode: {
        type: String,
        required: [true , "Verifycode is required!"]
    },
    isVerifiedEmail: {
        type: Boolean,
        default: false
    },
    verifyCodeExpiry: {
        type: Date
    }
} , {
        timestamps: true
    })



export const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);

