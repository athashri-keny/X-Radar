// lib/Emailtransporter.ts
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// console.log('resend api key' , process.env.RESEND_API_KEY)

export default resend