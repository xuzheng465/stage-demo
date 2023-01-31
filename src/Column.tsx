import { CardContainer, ColumnContainer, ColumnTitle } from "./styles";
import Card from "./Card";
import { AddNewItem } from "./AddNewItem";
import { useAppState } from "./state/AppStateContext";
import { addLead, moveStage, moveLead, setDraggedItem } from "./state/actions";
import { useRef } from "react";
import { useItemDrag } from "./utils/useItemDrag";
import { throttle } from "throttle-debounce-ts";
import { useDrop } from "react-dnd";
import { isHidden } from "./utils/isHidden";
import { LeadContent } from "./state/appStateReducer";

type ColumnProps = {
  text: string;
  id: string;
  isPreview?: boolean;
};

function Column({ text, id, isPreview }: ColumnProps) {
  const { draggedItem, getLeadsByListId, dispatch } = useAppState();

  const leads = getLeadsByListId(id);

  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: ["COLUMN", "CARD"],
    hover: throttle(200, () => {
      if (!draggedItem) {
        return;
      }
      if (draggedItem.type === "COLUMN") {
        if (draggedItem.id === id) {
          return;
        }
        dispatch(moveStage(draggedItem.id, id));
      } else {
        if (draggedItem.columnId === id) {
          return;
        }
        if (leads.length) return;
        dispatch(moveLead(draggedItem.id, null, draggedItem.columnId, id));
        dispatch(setDraggedItem({ ...draggedItem, columnId: id }));
      }
    }),
  });

  const { drag } = useItemDrag({ type: "COLUMN", id, text });

  drag(drop(ref));

  return (
    <ColumnContainer
      isPreview={isPreview}
      ref={ref}
      isHidden={isHidden(draggedItem, "COLUMN", id, isPreview)}
    >
      <ColumnTitle>{text}</ColumnTitle>
      {leads.map((task) => (
        <Card
          text={task.text}
          key={task.id}
          id={task.id}
          columnId={id}
          content={task.content}
        />
      ))}
      <AddNewItem
        toggleButtonText="+ Add another lead"
        onAdd={(text) => dispatch(addLead(text, id))}
        dark
      />
    </ColumnContainer>
  );
}

export default Column;
