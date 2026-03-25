
import zod, { z } from 'zod'



export const VerifycodeSchema = z.object({
    code: z.string()
    .min(1 , "Otp required!")
})
