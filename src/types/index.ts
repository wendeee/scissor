export interface MessageObject {
    type: "error" | "success" | "warning";
    content: string;
    duration?: number;
  }

  export interface ShortenURLForm {
    longURL: string;
    customName?: string;
  }