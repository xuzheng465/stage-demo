import { LeadContent } from "./state/appStateReducer";

export type ColumnDragItem = {
  id: string;
  text: string;
  type: "COLUMN";
};

export type CardDragItem = {
  id: string;
  columnId: string;
  text: string;
  content: LeadContent;
  type: "CARD";
};

export type DragItem = CardDragItem | ColumnDragItem;
