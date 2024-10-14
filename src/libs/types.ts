export interface CustomAction {
  type: "wave" | "location" | "share" | "join" | "other";
  options?: string[];
  prompt?: string;
}
