import * as z from "zod";

const formSchema = z.object({
    searchString: z.string().min(1, {
        message: "Please enter atleast 1 character to search",
    }),
});

export { formSchema };
export type formSchemaType = z.infer<typeof formSchema>;
