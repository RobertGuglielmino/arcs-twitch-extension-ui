import { z } from 'zod';

export const gameDataSchema = z.object({
  playerData: z.object({
    name: z.array(z.string()),
    fate: z.array(z.string()),
    color: z.array(z.string()),
    power: z.array(z.number()),
    objectiveProgress: z.array(z.number()),
    resources: z.array(z.array(z.string())),
    outrage: z.array(z.array(z.boolean())),
    courtCards: z.array(z.array(z.string())),
    supply: z.object({
      cities: z.array(z.number()),
      starports: z.array(z.number()),
      ships: z.array(z.number()),
      agents: z.array(z.number()),
      favors: z.array(z.array(z.number()))
    }),
    hasFlagship: z.array(z.boolean()),
    flagshipBoard: z.array(z.string()),
    ambitionProgress: z.object({
      tycoon: z.array(z.number()),
      tyrant: z.array(z.number()),
      warlord: z.array(z.number()),
      keeper: z.array(z.number()),
      empath: z.array(z.number()),

      blightkin: z.array(z.number()),
      edenguard: z.array(z.number()),
    }),
    titles: z.array(z.array(z.number())),
  }),
  generalData: z.object({
    isCampaign: z.boolean(),
    ambitionDeclarations: z.object({
      tycoon: z.array(z.string()),
      tyrant: z.array(z.string()),
      warlord: z.array(z.string()),
      keeper: z.array(z.string()),
      empath: z.array(z.string()),

      blightkin: z.array(z.string()),
      edenguard: z.array(z.string()),
    }),
    ambitionPodium: z.object({
      tycoon: z.array(z.array(z.number())),
      tyrant: z.array(z.array(z.number())),
      warlord: z.array(z.array(z.number())),
      keeper: z.array(z.array(z.number())),
      empath: z.array(z.array(z.number())),

      blightkin: z.array(z.array(z.number())),
      edenguard: z.array(z.array(z.number())),
    }),
    hasEdengiard: z.boolean(),
    hasBlightkin: z.boolean(),
    courtCards: z.object({
      id: z.string(),
      agents: z.object({
        color: z.string(),
        value: z.number()
      })
    }),
    edicts: z.array(z.string()),
    laws: z.array(z.string())
  })
});