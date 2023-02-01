import { useDragLayer } from "react-dnd";
import Column from "./Column";
import { CustomDragLayerContainer, DragPreviewWrapper } from "./styles";
import { useAppState } from "./state/AppStateContext";
import Card from "./Card";

type CustomDragLayerProps = {
  showAddLeadModal: () => void;
  showEditLeadModal: () => void;
};

export const CustomDragLayer = ({
  showAddLeadModal,
  showEditLeadModal,
}: CustomDragLayerProps) => {
  const { draggedItem } = useAppState();
  // currentOffset contains the xy and y coordinates of the dragged item
  const { currentOffset } = useDragLayer((monitor) => ({
    currentOffset: monitor.getSourceClientOffset(),
  }));

  return draggedItem && currentOffset ? (
    <CustomDragLayerContainer>
      <DragPreviewWrapper position={currentOffset}>
        {draggedItem.type === "COLUMN" ? (
          <Column
            id={draggedItem.id}
            text={draggedItem.text}
            isPreview
            showAddLeadModal={showAddLeadModal}
            showEditLeadModal={showEditLeadModal}
          />
        ) : (
          <Card
            columnId={draggedItem.columnId}
            isPreview
            id={draggedItem.id}
            text={draggedItem.text}
            content={draggedItem.content}
            showEditLeadModal={showEditLeadModal}
          />
        )}
      </DragPreviewWrapper>
    </CustomDragLayerContainer>
  ) : null;
};
