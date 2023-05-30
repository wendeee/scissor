export interface MessageObject {
    type: "error" | "success" | "warning";
    content: string;
    duration?: number;
  }