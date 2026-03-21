import mongoose , {Schema , Document} from "mongoose";


export interface WaitList extends Document{
    Email: string,
    niche: string
}

const WaitlistSchema = new Schema<WaitList>({
    Email: {
        type: String,
        required: [true , "Email is required!"]
    }, 
    niche: {
        type: String,
        required: [true , "Niche is required!"]
    }
} , {
    timestamps: true
})


export const WaitListModel =
  (mongoose.models.WaitlistSchema as mongoose.Model<WaitList>) ||
  mongoose.model<WaitList>("waitlists", WaitlistSchema);
