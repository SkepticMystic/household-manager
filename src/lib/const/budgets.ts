export const BUDGET_ITEM_CONST = {
  CATEGORIES: [
    "food",
    "accommodation",
    "health",
    "transport",
    "entertainment",
    "clothes",
    "pets",
    "other",
  ] as const,
};

const CATEGORY_LABELS: Record<
  typeof BUDGET_ITEM_CONST.CATEGORIES[number],
  string
> = {
  food: "🍽️ Food",
  accommodation: "🏠 Accommodation",
  health: "🏥 Health",
  transport: "🚗 Transport",
  entertainment: "🎉 Entertainment",
  clothes: "👕 Clothes",
  pets: "🐶 Pets",
  other: "📦 Other",
};

export const BUDGET_ITEM_LABELS = {
  CATEGORIES: CATEGORY_LABELS,
};
