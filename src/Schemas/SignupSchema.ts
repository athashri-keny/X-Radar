import z from "zod";


const signupSchema = z.object({
    Name: z.string().min(2 , "Name is to short").trim().toLowerCase(),
  Email: z
    .string()
    .trim()
    .min(1, "Email is required!")
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ , {message: "error email is not Vaild!"}),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),

    // refine checks if the values is always true if not then throw error
  aggrements: z.boolean().default(false).refine(val => val === true, {
  message: "You must accept the terms to continue"
})

})

export default signupSchema