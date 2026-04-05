import mongoose , {Schema , Document} from "mongoose";


export interface SearchRun extends Document{
    UserId: mongoose.Types.ObjectId,
    keywords: string,
    status: 'pending' | 'done' | 'failed',
    LastRun: Date
}


const SearchRunSchema = new Schema<SearchRun>({

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