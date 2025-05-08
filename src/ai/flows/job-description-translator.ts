'use server';

/**
 * @fileOverview A job description translator AI agent.
 *
 * - translateJobDescription - A function that translates a job description into a specified language.
 * - TranslateJobDescriptionInput - The input type for the translateJobDescription function.
 * - TranslateJobDescriptionOutput - The return type for the translateJobDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TranslateJobDescriptionInputSchema = z.object({
  jobDescription: z.string().describe('The job description to translate.'),
  language: z.string().describe('The target language for translation.'),
});
export type TranslateJobDescriptionInput = z.infer<
  typeof TranslateJobDescriptionInputSchema
>;

const TranslateJobDescriptionOutputSchema = z.object({
  translatedDescription: z
    .string()
    .describe('The translated job description.'),
});
export type TranslateJobDescriptionOutput = z.infer<
  typeof TranslateJobDescriptionOutputSchema
>;

export async function translateJobDescription(
  input: TranslateJobDescriptionInput
): Promise<TranslateJobDescriptionOutput> {
  return translateJobDescriptionFlow(input);
}

const translateJobDescriptionPrompt = ai.definePrompt({
  name: 'translateJobDescriptionPrompt',
  input: {schema: TranslateJobDescriptionInputSchema},
  output: {schema: TranslateJobDescriptionOutputSchema},
  prompt: `Translate the following job description into {{{language}}}:

{{{jobDescription}}}`,
});

const translateJobDescriptionFlow = ai.defineFlow(
  {
    name: 'translateJobDescriptionFlow',
    inputSchema: TranslateJobDescriptionInputSchema,
    outputSchema: TranslateJobDescriptionOutputSchema,
  },
  async input => {
    const {output} = await translateJobDescriptionPrompt(input);
    return output!;
  }
);
