import mongoose , {Schema , Document} from "mongoose";

export interface Lead extends Document{
SearchRunId: mongoose.Types.ObjectId,
userId: mongoose.Types.ObjectId,
TweetText: string,
Tweeturl: string,
Score: Number,
suggestedReply: string,
createdAt: Date
}

const LeadsSchema = new Schema<Lead>({

    SearchRunId: {
        type: mongoose.Types.ObjectId,
        ref: 'SearchRun',
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    TweetText: {
        type: String,
        required: [true , "tweet text is required!"],
        maxLength: 5000
    },
    Tweeturl: {
        type: String,
        required: [true , "Tweet url is required!"]
    },
    Score: {
        type: Number,
        required: [true , "Tweet Url is required"]
    },
    suggestedReply: {
        type: String,
      required: false,
      maxLength: 5000
    },
     createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 60 * 12, // 24 hours
  },
} , {
   
})


const LeadsModel = (mongoose.models.Leads|| mongoose.model<Lead>("Leads" , LeadsSchema))


export default LeadsModel