import z from "zod";
import { isActive, Role } from "./user.interface";

export const createUserZodSchema = z.object({
    name: z
        .string({ message: "Title is required" })
        .min(2, { message: "Name must be at 2 characters long." })
        .max(50, { message: "Name cannot exceed 50 characters." }),

    email: z
        .string({ error: "Email must be string" })
        .email({ message: "Invalid email address format." })
        .min(5, { message: "Email must be at least 5 characters." })
        .max(100, { message: "Email connot exceed 100 characters" }),
    password: z
        .string({ error: "Password must be string" })
        .min(8, { message: "Password must be least 8 characters long." })
        .regex(/^(?=.*[A-Z])/, { message: "Password must contain at least 1 Uppercase letter." })
        .regex(/^(?=.*\d)/, { message: "Password must contain at least 1 number character." })
        .regex(/^(?=.*[!@#$%^&*])/, { message: "Password must contain at least 1 special character." }),
    phone: z
        .string({ error: "phone number must be string." })
        .regex(/^(?:\+?88)?01[3-9]\d{8}$/, {
            message: "Please enter a valid Bangladesh phone number",
        })
        .optional(),
    address: z
        .string({ error: "Address must be string." })
        .max(200, { message: "Address cannot exceed 200 characters." })
        .optional()
})

export const updateUserZodSchema = z.object({
    name: z
        .string({ message: "Title is required" })
        .min(2, { message: "Name must be at 2 characters long." })
        .max(50, { message: "Name cannot exceed 50 characters." })
        .optional(),

    password: z
        .string({ error: "Password must be string" })
        .min(8, { message: "Password must be least 8 characters long." })
        .regex(/^(?=.*[A-Z])/, { message: "Password must contain at least 1 Uppercase letter." })
        .regex(/^(?=.*\d)/, { message: "Password must contain at least 1 number character." })
        .regex(/^(?=.*[!@#$%^&*])/, { message: "Password must contain at least 1 special character." })
        .optional(),
    phone: z
        .string({ error: "phone number must be string." })
        .regex(/^(?:\+?88)?01[3-9]\d{8}$/, {
            message: "Please enter a valid Bangladesh phone number",
        })
        .optional(),
    address: z
        .string({ error: "Address must be string." })
        .max(200, { message: "Address cannot exceed 200 characters." })
        .optional(),
    
    role: z
    .enum(Object.values(Role) as [string])
    .optional(),

    isActive: z
    .enum(Object.values(isActive) as [string])
    .optional(),

    isDelete: z
    .boolean({error: "isDelete must be true or false"})
    .optional(),

    isVerified: z
    .boolean({error: "isVerified must be true or false"})
    .optional()
})