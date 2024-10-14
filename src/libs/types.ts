export interface CustomAction {
  type: "wave" | "location" | "share" | "other";
  options?: string[];
  prompt?: string;
}
