import React from "react";
import { AddNewItem } from "./AddNewItem";
import Column from "./Column";
import { useAppState } from "./state/AppStateContext";
import { AppContainer } from "./styles";
import { addStage } from "./state/actions";
import { CustomDragLayer } from "./CustomDragLayer";

function App() {
  const { stages, dispatch } = useAppState();

  return (
    <AppContainer>
      <CustomDragLayer />
      {stages.map((stage) => (
        <Column text={stage.text} key={stage.id} id={stage.id} />
      ))}
      {/* <AddNewItem
        toggleButtonText="+ Add another list"
        onAdd={(text) => dispatch(addStage(text))}
      /> */}
    </AppContainer>
  );
}

export default App;
