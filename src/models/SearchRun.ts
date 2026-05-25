import mongoose , {Schema , Document} from "mongoose";
import { arrayOutputType } from "zod/v3";


export interface SearchRun extends Document{
    ApifyRunId: string,
    UserId: mongoose.Types.ObjectId,
    keywords: string,
    status: 'pending' | 'done' | 'failed' | 'filtering',
    LastRun: Date,
    TotalTweetsScraped: number,
    TotalLeadsFound: number,
    seenTweetIds: [string],
    cooldownEndsAt: Date
}


const SearchRunSchema = new Schema<SearchRun>({
    ApifyRunId: {
        type: String,
        required: false
    },
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
       required: [true , "User id is required!"]
    },
    keywords: {
        type: String,
        required: [true , "keyword is required!" ]
    },
    status: {
        type: String,
        enum: ['pending', 'done' , 'failed' , 'filtering'],
        default: 'pending'
    },
    LastRun: {
        type: Date,
        required: [true , "Last run date is required!"]
    },
    TotalTweetsScraped: {
        type: Number
    },
    TotalLeadsFound: {
        type: Number,
    },
    seenTweetIds: {
        type: [String],
        default: []
    },
    cooldownEndsAt: {
        type: Date,
        default: null        // null = no active cooldown
    },

} , {
timestamps: true
})

const SearchRunModel = mongoose.models.searchruns || mongoose.model<SearchRun>("searchruns", SearchRunSchema)


export default SearchRunModel