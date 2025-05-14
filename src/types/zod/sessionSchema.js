import { z } from "zod";

const sessionSchema = z.object({
    date: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "Невірний формат дати")
        .transform((val) => {
            const [year, month, day] = val.split("-");
            return `${day}-${month}-${year}`; // або new Date(val)
        }),
    time: z.string().regex(/^\d{2}:\d{2}$/, "Невірний формат часу"),
    price: z.number(),
    seatsNumber: z.number(),
});

// export const sessionRegisterSchema = z.object({
//     date: z.date().require("Дата початку обов'язкова"),
//     time: z.string().require("Час початку обов'язковий"),
//     price: z.number().require("Ціна обов'язкова"),
//     seatsNumber: z.number().require("Кількість місць обов'язкова"),
// });

export default sessionSchema;