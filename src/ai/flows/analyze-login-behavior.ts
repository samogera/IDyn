'use server';

/**
 * @fileOverview This file defines a Genkit flow for analyzing user login behavior and detecting anomalies.
 *
 * The flow takes user login data as input, uses an AI model to score the login for fraud risk,
 * and returns a risk score along with a recommendation to flag the login if the score is above a threshold.
 *
 * @fileExport analyzeLoginBehavior - The function to call to analyze login behavior.
 * @fileExport AnalyzeLoginBehaviorInput - The input type for the analyzeLoginBehavior function.
 * @fileExport AnalyzeLoginBehaviorOutput - The return type for the analyzeLoginBehavior function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeLoginBehaviorInputSchema = z.object({
  ipAddress: z.string().describe('The IP address of the login attempt.'),
  geolocation: z.string().describe('The geolocation of the login attempt.'),
  browserFingerprint: z
    .string()
    .describe('The browser fingerprint of the login attempt.'),
  userId: z.string().describe('The ID of the user attempting to log in.'),
});
export type AnalyzeLoginBehaviorInput = z.infer<
  typeof AnalyzeLoginBehaviorInputSchema
>;

const AnalyzeLoginBehaviorOutputSchema = z.object({
  fraudRiskScore: z
    .number()
    .describe(
      'A score from 0 to 1 indicating the risk of fraud associated with the login attempt.  Higher values indicate higher risk.'
    ),
  recommendation: z
    .string()
    .describe(
      'A recommendation to either flag or not flag the login attempt for further review.'
    ),
});
export type AnalyzeLoginBehaviorOutput = z.infer<
  typeof AnalyzeLoginBehaviorOutputSchema
>;

export async function analyzeLoginBehavior(
  input: AnalyzeLoginBehaviorInput
): Promise<AnalyzeLoginBehaviorOutput> {
  return analyzeLoginBehaviorFlow(input);
}

const analyzeLoginBehaviorPrompt = ai.definePrompt({
  name: 'analyzeLoginBehaviorPrompt',
  input: {schema: AnalyzeLoginBehaviorInputSchema},
  output: {schema: AnalyzeLoginBehaviorOutputSchema},
  prompt: `You are a fraud detection expert analyzing user login behavior.

  Based on the provided IP address, geolocation, and browser fingerprint,
  assess the risk of fraud associated with this login attempt.

  Assign a fraudRiskScore between 0 and 1, where 0 indicates very low risk and 1 indicates very high risk.

  Provide a recommendation to either flag or not flag the login attempt for further review.

  Consider factors such as:
  - Unusual IP addresses or geolocation patterns for the user
  - Discrepancies in the browser fingerprint
  - Any other suspicious indicators

  Return your analysis in JSON format.

  IP Address: {{{ipAddress}}}
  Geolocation: {{{geolocation}}}
  Browser Fingerprint: {{{browserFingerprint}}}
  User ID: {{{userId}}}
  `,
});

const analyzeLoginBehaviorFlow = ai.defineFlow(
  {
    name: 'analyzeLoginBehaviorFlow',
    inputSchema: AnalyzeLoginBehaviorInputSchema,
    outputSchema: AnalyzeLoginBehaviorOutputSchema,
  },
  async input => {
    const {output} = await analyzeLoginBehaviorPrompt(input);
    return output!;
  }
);
