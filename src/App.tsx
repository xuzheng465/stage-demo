import { useState } from "react";

import Column from "./Column";
import { useAppState } from "./state/AppStateContext";
import { AppContainer } from "./styles";

import { CustomDragLayer } from "./CustomDragLayer";
import AddLeadModal from "./components/Modal/AddLeadModal";

function App() {
  const { stages } = useAppState();
  const [isAddLeadModalOpen, setIsAddLeadModalOpen] = useState(false);

  const showAddLeadModal = () => {
    setIsAddLeadModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddLeadModalOpen(false);
  };

  return (
    <>
      <AppContainer>
        <CustomDragLayer showAddLeadModal={showAddLeadModal} />
        {stages.map((stage) => (
          <Column
            text={stage.text}
            key={stage.id}
            id={stage.id}
            showAddLeadModal={showAddLeadModal}
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
    </>
  );
}

export default App;
