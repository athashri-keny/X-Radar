import mongoose , {Schema , Document} from "mongoose";



// struture 
export interface User extends Document{
    Name: string,
    Email: string,
    password: string,
    verifycode: string,
    verifyCodeExpiry: Date,
    isVerifiedEmail?: boolean,
    Niche: string,
    subniches: string
    // plan: 'free' | 'premium',
    // planExpiresAt?: Date,        // when does premium expire?
    // razorpayCustomerId?: string  // for payment tracking
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
        required: false
    },
    verifycode: {
        type: String,
        required: false
    },
    isVerifiedEmail: {
        type: Boolean,
        default: false
    },
    verifyCodeExpiry: {
        type: Date
    },
    Niche: {
        type: String,
        required: false
    },
    subniches: {
        type: String,
        required: false
    }
} , {
        timestamps: true
    })



export const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);

