import { Action } from "./actions";
import { nanoid } from "nanoid";
import { findItemIndexById, moveItem } from "../utils/arrayUtils";
import { DragItem } from "../DragItem";

export type LeadContent = {
  name: string;
  rate: string;
  intend: string;
  sale: string;
  price: string;
  stage: string;
};

export type Lead = {
  id: string;
  text: string;
  content: LeadContent;
};

export type Stage = {
  id: string;
  text: string;
  leads: Lead[];
};

export type AppState = {
  stages: Stage[];
  draggedItem: DragItem | null;
};

export const appStateReducer = (
  draft: AppState,
  action: Action
): AppState | void => {
  switch (action.type) {
    case "ADD_STAGE": {
      draft.stages.push({
        id: nanoid(),
        text: action.payload,
        leads: [],
      });
      break;
    }
    case "ADD_LEAD": {
      const { text, listId } = action.payload;
      const targetListIndex = findItemIndexById(draft.stages, listId);

      draft.stages[targetListIndex].leads.push({
        id: nanoid(),
        text,
        content: {} as LeadContent,
      });
      break;
    }
    case "MOVE_STAGE": {
      const { draggedId, hoverId } = action.payload;
      const dragIndex = findItemIndexById(draft.stages, draggedId);
      const hoverIndex = findItemIndexById(draft.stages, hoverId);
      draft.stages = moveItem(draft.stages, dragIndex, hoverIndex);
      break;
    }

    case "SET_DRAGGED_ITEM": {
      draft.draggedItem = action.payload;
      break;
    }

    case "MOVE_LEAD": {
      const { draggedItemId, hoveredItemId, sourceColumnId, targetColumnId } =
        action.payload;

      const sourceListIndex = findItemIndexById(draft.stages, sourceColumnId);
      const targetListIndex = findItemIndexById(draft.stages, targetColumnId);

      const dragIndex = findItemIndexById(
        draft.stages[sourceListIndex].leads,
        draggedItemId
      );

      const hoverIndex = hoveredItemId
        ? findItemIndexById(draft.stages[targetListIndex].leads, hoveredItemId)
        : 0;

      const item = draft.stages[sourceListIndex].leads[dragIndex];

      item.content.stage = String(targetListIndex);
      // Remove the task from the source list
      draft.stages[sourceListIndex].leads.splice(dragIndex, 1);

      // firebase做后端时会删除
      if (typeof draft.stages[targetListIndex].leads === "undefined") {
        draft.stages[targetListIndex].leads = [];
      }
      // Add the task to the target list
      draft.stages[targetListIndex].leads.splice(hoverIndex, 0, item);

      break;
    }

    default: {
      break;
    }
  }
};
