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
    subniches: string,
    LastRun: Date,
  plan: "free" | "pro";                  // "premium" → "pro" to match Dodo naming
  planActivatedAt?: Date;                // when did they go pro?
  planExpiresAt?: Date;                  // if you want expiry-based gating

  // ── dodo payments ────────────────────────────────
  dodoCustomerId?: string;               // e.g. "cust_abc123" — Dodo's internal ID
  subscriptionId?: string;   
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
    },
    // plan fields
    plan: { 
        type: String, 
        enum: ["free", "pro"], 
        default: "free" 
    },
    planActivatedAt: {
         type: Date,
          default: null 
        },
    planExpiresAt: {
         type: Date,
          default: null 
        },
// dodo fields
    dodoCustomerId: {
         type: String,
         default: null
        },
    subscriptionId: { 
        type: String,
         default: null
     },
     LastRun: {
        type: mongoose.Schema.Types.Date,
        default: null
     }
} , {
        timestamps: true
    })



export const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);

