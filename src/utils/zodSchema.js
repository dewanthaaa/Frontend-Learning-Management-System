import z from "zod";

export const signUpSchema = z.object({
  name: z.string().min(5),
  email: z.string().email(),
  password: z.string().min(5),
});

export const signInSchema = signUpSchema.omit({ name: true });

export const createCourseSchema = z.object({
  name: z.string().min(5),
  categoryId: z.string().min(5, { message: "Please choose a category" }),
  tagline: z.string().min(5),
  description: z.string().min(10),
  thumbnail: z
    .any()
    .refine((file) => file?.name, { message: "Thumbnail is required" }),
});

export const updateCourseSchema = createCourseSchema.partial({
  thumbnail: true,
});

export const createStudentSchema = z.object({
  name: z.string().min(5),
  email: z.string().email(),
  password: z.string().min(5),
  photo: z.any().refine((file) => file?.name, { message: "Photo is required" }),
});

export const updateStudentSchema = createStudentSchema.omit({
  password: true,
  photo: true,
});

export const addStudentCourseSchema = z.object({
  studentId: z.string().min(5),
});
