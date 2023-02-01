import { DragItem } from "../DragItem";
import { LeadContent } from "./appStateReducer";

export type Action =
  | {
      type: "ADD_STAGE";
      payload: string;
    }
  | {
      type: "ADD_LEAD";
      payload: { lead: LeadContent; stageId: string | null };
    }
  | {
      type: "MOVE_STAGE";
      payload: {
        draggedId: string;
        hoverId: string;
      };
    }
  | {
      type: "SET_LEAD_ID";
      payload: {
        leadId: string;
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
    }
  | {
      type: "SET_COL_ID";
      payload: {
        columnId: string;
      };
    }
  | {
      type: "UPADATE_LEAD";
    };

export const addLead = (lead: LeadContent, stageId: string | null): Action => ({
  type: "ADD_LEAD",
  payload: {
    lead,
    stageId,
  },
});

export const setCurrentColId = (columnId: string): Action => ({
  type: "SET_COL_ID",
  payload: {
    columnId,
  },
});

export const setCurrentLeadId = (leadId: string): Action => ({
  type: "SET_LEAD_ID",
  payload: {
    leadId,
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
