import mongoose , {Schema , Document} from "mongoose";


export interface SearchRun extends Document{
    UserId: mongoose.Types.ObjectId,
    keywords: string,
    status: 'pending' | 'done' | 'failed',
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
    }
    
} , {
timestamps: true
})

const SearchRunModel = (mongoose.models.SearchRunSchema<SearchRun> || mongoose.model<SearchRun>("SearchRun" , SearchRunSchema))


export default SearchRunModel