import z, { array, boolean, number, object, string } from 'zod';

export const HealthConcernsSchema = object({
  health_concerns: array(
    object({
      id: number(),
      name: string(),
      priority: number(),
    }),
  )
    .min(1, {
      error: 'Please select at least one',
    })
    .max(5, {
      error: 'You can only select up to 5',
    })
    .nonoptional({
      error: 'Select your health concerns',
    }),
});

export const DietsSchema = object({
  diets: array(
    object({
      id: number(),
      name: string(),
    }),
  ).nonoptional({
    error: 'Select your diets',
  }),
});

export const AllergiesSchema = object({
  allergies: array(
    object({
      id: number(),
      name: string(),
    }),
  ).optional(),
});

export const QuestionsSchema = z.object({
  is_daily_exposure: boolean()
    .nullable()
    .refine(val => val !== null, {
      message: 'Answer is required',
    }),
  is_smoke: boolean()
    .nullable()
    .refine(val => val !== null, {
      message: 'Answer is required',
    }),
  alcohol: string()
    .trim()
    .min(1, 'Answer is required')
    .nullable()
    .refine(val => val !== null, {
      message: 'Answer is required',
    }),
});

export type HealthConcernsValues = z.infer<typeof HealthConcernsSchema>;
export type DietsValues = z.infer<typeof DietsSchema>;
export type AllergiesValues = z.infer<typeof AllergiesSchema>;
export type QuestionsValues = z.infer<typeof QuestionsSchema>;
