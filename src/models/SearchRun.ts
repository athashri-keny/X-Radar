import mongoose , {Schema , Document} from "mongoose";
import { arrayOutputType } from "zod/v3";


export interface SearchRun extends Document{
    ApifyRunId: string,
    UserId: mongoose.Types.ObjectId,
    keywords: Array<string>,
    status: 'pending' | 'done' | 'failed',
    LastRun: Date
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
        type: [String],
        required: [true , "keyword is required!" ]
    },
    status: {
        type: String,
        enum: ['pending', 'done' , 'failed'],
        default: 'pending'
    },
    LastRun: {
        type: Date,
        required: [true , "Last run date is required!"]
    }
} , {
timestamps: true
})

const SearchRunModel = mongoose.models.SearchRun || mongoose.model<SearchRun>("searchruns", SearchRunSchema)


export default SearchRunModel