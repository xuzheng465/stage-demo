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
  stage: string | null;
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
  curColId: string | null;
  curLeadId: string | null;
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
      const { lead, stageId } = action.payload;
      const targetListIndex = findItemIndexById(draft.stages, stageId);

      draft.stages[targetListIndex].leads.push({
        id: nanoid(),
        text: "a lead",
        content: lead,
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

    case "SET_COL_ID": {
      draft.curColId = action.payload.columnId;
      break;
    }

    case "SET_LEAD_ID": {
      draft.curLeadId = action.payload.leadId;
      break;
    }
    case "UPADATE_LEAD": {
      const { lead, columnId, leadId } = action.payload;
      const colIndex = findItemIndexById(draft.stages, columnId);
      const leadIndex = findItemIndexById(draft.stages[colIndex].leads, leadId);

      const oldItem = draft.stages[colIndex].leads[leadIndex];
      const newItem = { ...oldItem, content: lead };
      draft.stages[colIndex].leads[leadIndex] = newItem;
      break;
    }

    case "DELETE_LEAD": {
      const { leadId, stageId } = action.payload;
      const stageIndex = findItemIndexById(draft.stages, stageId);
      const leads = draft.stages[stageIndex].leads.filter(
        (l) => l.id !== leadId
      );
      draft.stages[stageIndex].leads = leads;
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
