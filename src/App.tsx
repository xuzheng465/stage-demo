import { useEffect, useState } from "react";

import Column from "./Column";
import { useAppState } from "./state/AppStateContext";
import { AppContainer } from "./styles";

import { CustomDragLayer } from "./CustomDragLayer";
import AddLeadModal from "./components/Modal/AddLeadModal";
import EditLeadModal from "./components/Modal/EditLeadModal";
import { ConfigContext } from "antd/es/config-provider";

function App() {
  const { stages, curLeadId } = useAppState();
  const [isAddLeadModalOpen, setIsAddLeadModalOpen] = useState(false);
  const [isEditLeadModalOpen, setIsEditLeadModalOpen] = useState(false);

  const showAddLeadModal = () => {
    setIsAddLeadModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddLeadModalOpen(false);
  };

  const showEditLeadModal = () => {
    setIsEditLeadModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditLeadModalOpen(false);
  };

  return (
    <>
      <AppContainer>
        <CustomDragLayer
          showAddLeadModal={showAddLeadModal}
          showEditLeadModal={showEditLeadModal}
        />
        {stages.map((stage) => (
          <Column
            text={stage.text}
            key={stage.id}
            id={stage.id}
            showAddLeadModal={showAddLeadModal}
            showEditLeadModal={showEditLeadModal}
          />
        ))}
        {/* <AddNewItem
        toggleButtonText="+ Add another list"
        onAdd={(text) => dispatch(addStage(text))}
      /> */}
      </AppContainer>
      <AddLeadModal
        isModalOpen={isAddLeadModalOpen}
        onClose={handleCloseModal}
      />

      <EditLeadModal
        isModalOpen={isEditLeadModalOpen}
        onClose={handleCloseEditModal}
      />
    </>
  );
}

export default App;
