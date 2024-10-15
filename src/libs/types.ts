export interface CustomAction {
  type: "wave" | "location" | "share" | "join" | "other" | "birthdate";
  options?: string[];
  prompt?: string;
}
