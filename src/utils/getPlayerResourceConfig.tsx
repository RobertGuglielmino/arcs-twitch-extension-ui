
export function getPlayerResourceConfig(imgSrc: (s: string) => string) {
    return {
        positions: [
          { top: 25, left: 9.6 },
          { top: 25, left: 21.25 },
          { top: 25, left: 32.9 },
          { top: 25, left: 44.55 },
          { top: 25, left: 56.2 },
          { top: 25, left: 67.85 }
        ],
        size: { width: 11 },
        images: {
          "material": imgSrc("material"),
          "fuel": imgSrc("fuel"),
          "weapons": imgSrc("weapons"),
          "relic": imgSrc("relic"),
          "psionics": imgSrc("psionics"),
        }
      };
}