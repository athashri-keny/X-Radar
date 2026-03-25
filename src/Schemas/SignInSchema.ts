import z from "zod";




const SignSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required!")
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ , {message: "error email is not Vaild!"}),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),

})

export default SignSchema