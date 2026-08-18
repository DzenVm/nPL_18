export type ProductionStatus = "demo" | "w-przygotowaniu" | "w-planach";

export const statusLabel: Record<ProductionStatus, string> = {
  demo: "Grywalne demo",
  "w-przygotowaniu": "W przygotowaniu",
  "w-planach": "W planach",
};
