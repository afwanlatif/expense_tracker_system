import { z } from 'zod';
import { Record_Status, Transaction_Type } from '../../constants/enum.constants';

export const CreateTransactionReqModelSchema = z.object({
    type: z.enum([Transaction_Type.income, Transaction_Type.expense])
        .default(Transaction_Type.income),
    amount: z.number().min(1, { message: "Amount must be at least 1" }),
    description: z.string().optional(),
    category: z.string(),
    recStatus: z.enum([Record_Status.active, Record_Status.inactive])
        .default(Record_Status.active),
    date: z.string().transform((str) => new Date(str)).optional()
});

//// Schema For Transaction Updation Making All Require Fields To Optional except id

export const UpdateTransactionReqModelSchema = CreateTransactionReqModelSchema.partial().extend({
    id: z.string()
})


export type CreateTransactionReqModel = z.infer<typeof CreateTransactionReqModelSchema>;
export type UpdateTransactionReqModel = z.infer<typeof UpdateTransactionReqModelSchema>