import { GoogleGenAI } from '@google/genai';
import { CircleMember } from '../types';

export interface IcebreakerResult {
  icebreaker: string;
  starterQuestions: string[];
  sharedConnectionNote: string;
  suggestedActivity: string;
}

export async function generateAIIcebreaker(
  memberA: CircleMember,
  memberB: CircleMember,
  circleName: string,
  circleTopic: string
): Promise<IcebreakerResult> {
  const apiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || '';

  const sharedInterests = memberA.interests.filter(item => 
    memberB.interests.some(bItem => bItem.toLowerCase().includes(item.toLowerCase()) || item.toLowerCase().includes(bItem.toLowerCase()))
  );

  const fallbackShared = sharedInterests.length > 0 
    ? sharedInterests.join(', ') 
    : `${memberA.interests[0] || 'Community Building'} & ${memberB.interests[0] || 'Dialogue'}`;

  // If Gemini API Key is available, make the call
  if (apiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `You are the facilitator for The Shared Future Project's Dialogue Circles.
Two members from "${circleName}" are meeting for a 1-on-1 "Virtual Coffee" video chat to build deep interpersonal trust across worldviews:
- Member 1: ${memberA.name} (Role: ${memberA.role}, Interests: ${memberA.interests.join(', ')})
- Member 2: ${memberB.name} (Role: ${memberB.role}, Interests: ${memberB.interests.join(', ')})
- Circle Topic: ${circleTopic}

Generate a warm, captivating 1-on-1 icebreaker and 3 deep conversation starter questions that:
1. Shift from zero-sum or abstract debate to positive-sum co-elevation and personal lived experience.
2. Bridge their specific roles (${memberA.role} and ${memberB.role}) and interests (${fallbackShared}).
3. Inspire genuine curiosity, mutual empathy, and laughter.

Output ONLY valid JSON with no markdown wrapping in this format:
{
  "icebreaker": "A 2-sentence warm, inviting conversation spark that breaks the ice with humor and heart.",
  "starterQuestions": [
    "Question 1 (personal lived story)",
    "Question 2 (exploring their shared or complementary interests)",
    "Question 3 (a collaborative positive-sum future vision)"
  ],
  "sharedConnectionNote": "A 1-sentence observation on why these two specific members will have an extraordinary conversation.",
  "suggestedActivity": "A fun 2-minute micro-exercise for their call (e.g. show an item within arm's reach that symbolizes home)."
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
      });

      const responseText = response.text || '';
      // Clean possible markdown code fences
      const cleaned = responseText.replace(/```json/gi, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleaned);

      if (parsed.icebreaker && Array.isArray(parsed.starterQuestions)) {
        return {
          icebreaker: parsed.icebreaker,
          starterQuestions: parsed.starterQuestions,
          sharedConnectionNote: parsed.sharedConnectionNote || `Connecting ${memberA.name} (${memberA.role}) and ${memberB.name} (${memberB.role}) around ${fallbackShared}.`,
          suggestedActivity: parsed.suggestedActivity || 'Take a 60-second silent sip of your tea or coffee while contemplating what brings you hope this week.'
        };
      }
    } catch (err) {
      console.warn('Gemini API call failed or timed out, using intelligent generative fallback:', err);
    }
  }

  // Resilient, intelligent dynamic fallback generator
  const connectionHighlight = sharedInterests.length > 0
    ? `You both share a deep commitment to ${sharedInterests.slice(0, 2).join(' and ')}.`
    : `With ${memberA.name}'s perspective as a ${memberA.role} and ${memberB.name}'s experience as a ${memberB.role}, you bring complementary superpowers to ${circleTopic}.`;

  const dynamicQuestions = [
    `"${memberA.name} and ${memberB.name}, what is a personal story or early memory that made you care so passionately about ${memberA.interests[0] || circleTopic}?"`,
    `"Looking at your roles as ${memberA.role} and ${memberB.role}, what is an unspoken obstacle you've both noticed in building community trust that rarely gets talked about?"`,
    `"If our circle could accomplish one concrete, positive-sum project together over the next 6 months, what would you most love to co-create?"`
  ];

  return {
    icebreaker: `☕ "Pour your favorite warm beverage! Grab your mug, take a breath, and leave titles at the door: today is about two human beings finding common ground in a fragmented world."`,
    starterQuestions: dynamicQuestions,
    sharedConnectionNote: connectionHighlight,
    suggestedActivity: `Show & Tell: Each person takes 45 seconds to hold up an object on their desk or in their room that tells a story about who they are.`
  };
}
