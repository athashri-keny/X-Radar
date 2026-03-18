import mongoose , {Schema , Document} from "mongoose";

export interface Lead extends Document{
SearchRunId: mongoose.Types.ObjectId,
userId: mongoose.Types.ObjectId,
TweetText: string,
Tweeturl: string,
Score: Number,
suggestReplyAi: string,
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
        required: [true , "Tweet Text is required!"]
    },
    Tweeturl: {
        type: String,
        required: [true , "Tweet url is required!"]
    },
    Score: {
        type: String,
        required: [true , "Tweet Url is required"]
    },
    suggestReplyAi: {
        type: String,
      required: [true , "Suggest Ai reply required"]
    }
} , {
    timestamps: true
})


const LeadsModel = (mongoose.models.LeadsSchema<Lead> || mongoose.model<Lead>("Leads" , LeadsSchema))


export default LeadsModel