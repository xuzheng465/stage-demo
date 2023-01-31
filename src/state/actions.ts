import { DragItem } from "../DragItem";

export type Action =
  | {
      type: "ADD_STAGE";
      payload: string;
    }
  | {
      type: "ADD_LEAD";
      payload: { text: string; listId: string };
    }
  | {
      type: "MOVE_STAGE";
      payload: {
        draggedId: string;
        hoverId: string;
      };
    }
  | {
      type: "SET_DRAGGED_ITEM";
      payload: DragItem | null;
    }
  | {
      type: "MOVE_LEAD";
      payload: {
        draggedItemId: string;
        hoveredItemId: string | null;
        sourceColumnId: string;
        targetColumnId: string;
      };
    };

export const addLead = (text: string, listId: string): Action => ({
  type: "ADD_LEAD",
  payload: {
    text,
    listId,
  },
});

export const addStage = (text: string): Action => ({
  type: "ADD_STAGE",
  payload: text,
});

export const moveStage = (draggedId: string, hoverId: string): Action => ({
  type: "MOVE_STAGE",
  payload: {
    draggedId,
    hoverId,
  },
});

export const setDraggedItem = (draggedItem: DragItem | null): Action => ({
  type: "SET_DRAGGED_ITEM",
  payload: draggedItem,
});

export const moveLead = (
  draggedItemId: string,
  hoveredItemId: string | null,
  sourceColumnId: string,
  targetColumnId: string
): Action => ({
  type: "MOVE_LEAD",
  payload: {
    draggedItemId,
    hoveredItemId,
    sourceColumnId,
    targetColumnId,
  },
});
