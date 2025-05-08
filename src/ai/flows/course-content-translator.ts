'use server';

/**
 * @fileOverview This file defines a Genkit flow for automatically translating course content into a user's selected local language.
 *
 * - autoTranslateCourseContent - A function that translates the course content.
 * - AutoTranslateCourseContentInput - The input type for the autoTranslateCourseContent function.
 * - AutoTranslateCourseContentOutput - The return type for the autoTranslateCourseContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AutoTranslateCourseContentInputSchema = z.object({
  text: z.string().describe('The course content to be translated.'),
  language: z.string().describe('The target language for translation (e.g., Hindi, Telugu).'),
});
export type AutoTranslateCourseContentInput = z.infer<typeof AutoTranslateCourseContentInputSchema>;

const AutoTranslateCourseContentOutputSchema = z.object({
  translatedText: z.string().describe('The translated course content in the target language.'),
});
export type AutoTranslateCourseContentOutput = z.infer<typeof AutoTranslateCourseContentOutputSchema>;

export async function autoTranslateCourseContent(input: AutoTranslateCourseContentInput): Promise<AutoTranslateCourseContentOutput> {
  return autoTranslateCourseContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'autoTranslateCourseContentPrompt',
  input: {schema: AutoTranslateCourseContentInputSchema},
  output: {schema: AutoTranslateCourseContentOutputSchema},
  prompt: `Translate the following text into {{language}}:\n\n{{text}}`,
});

const autoTranslateCourseContentFlow = ai.defineFlow(
  {
    name: 'autoTranslateCourseContentFlow',
    inputSchema: AutoTranslateCourseContentInputSchema,
    outputSchema: AutoTranslateCourseContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
