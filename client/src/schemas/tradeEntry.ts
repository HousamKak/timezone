import { z } from 'zod';

export const TradeEntrySchema = z.object({
  id: z.string(),
  ticker: z.string().min(1, 'Ticker is required'),
  trade: z.enum(['Buy', 'Sell', 'Sell Short', 'Cover Short'], {
    errorMap: () => ({ message: 'Trade type is required' })
  }),
  strategy: z.array(z.string()).min(1, 'At least one strategy is required'),
  funds: z.array(z.string()).min(1, 'At least one fund is required'),
  currentPrice: z.number().positive('Current price must be greater than 0').or(z.literal(0)),
  targetPrice: z.number().positive('Target price must be greater than 0'),
  expectedExit: z.date().nullable(),
  files: z.array(z.instanceof(File)).default([]),
  status: z.enum(['Draft', 'Submitted', 'Approved', 'Rejected']).default('Draft'),
  createdAt: z.date(),
  updatedAt: z.date()
});

export const TradeEntryFormSchema = TradeEntrySchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  status: true
}).extend({
  isDraft: z.boolean().optional()
});

export type TradeEntryForm = z.infer<typeof TradeEntryFormSchema>;
