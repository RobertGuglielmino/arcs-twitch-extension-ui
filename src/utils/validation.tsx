import { z } from 'zod';

export const gameDataSchema = z.object({
  playerData: z.object({
    name: z.array(z.string()),
    fate: z.array(z.string()),
    color: z.array(z.string()),
    power: z.array(z.number()),
    objectiveProgress: z.array(z.string()),
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
    flagship: z.object({
      tactics: z.array(z.number()),
      fleet: z.array(z.number()),
      strategy: z.array(z.number())
    }),
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
    ambitionDeclarations: z.array(z.array(z.boolean())),
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