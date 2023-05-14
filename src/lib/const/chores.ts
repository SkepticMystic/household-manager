export const CHORES_CONST = {
  AREAS: [
    "kitchen",
    "living_room",
    "bedroom",
    "bathroom",
    "store_room",
    "garden",
    "bruno",
    "general",
  ] as const,
};

const AREA_LABELS: Record<typeof CHORES_CONST.AREAS[number], string> = {
  kitchen: "🍽️ Kitchen",
  living_room: "🛋️ Living Room",
  bedroom: "🛌 Bedroom",
  bathroom: "🚿 Bathroom",
  store_room: "📦 Store Room",
  garden: "🌱 Garden",
  bruno: "🐶 Bruno",
  general: "🏠 General",
};

export const CHORE_LABELS = {
  AREAS: AREA_LABELS,
} satisfies Record<keyof typeof CHORES_CONST, Record<string, string>>;
