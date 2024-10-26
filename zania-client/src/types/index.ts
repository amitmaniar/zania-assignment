export interface Card {
  type: string;
  title: string;
  position: number;
}

export interface SaveStatus {
  saving: boolean;
  lastSaved: Date | null;
  hasChanges: boolean;
}