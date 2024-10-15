export interface CustomAction {
  type:
    | "wave"
    | "location"
    | "share"
    | "join"
    | "other"
    | "birthdate"
    | "password";
  options?: string[];
  prompt?: string;
}
