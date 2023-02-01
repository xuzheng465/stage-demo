import { useState } from "react";
import { NewItemForm } from "./NewItemForm";
import { setCurrentColId } from "./state/actions";
import { useAppState } from "./state/AppStateContext";
import { AddItemButton } from "./styles";

type AddNewItemProps = {
  // onAdd(text: string): void;
  toggleButtonText: string;
  dark?: boolean;
  showModal: () => void;
  curColumnId: string;
};

export const AddNewItem = (props: AddNewItemProps) => {
  const { dispatch } = useAppState();

  const { toggleButtonText, dark, showModal, curColumnId } = props;

  // if (showForm) {
  //   return (
  //     <NewItemForm
  //       onAdd={(text) => {
  //         setShowForm(false);
  //       }}
  //       closeForm={closeNewItemForm}
  //     />
  //   );
  // }

  // function closeNewItemForm() {
  //   setShowForm(false);
  // }

  return (
    <AddItemButton
      dark={dark}
      onClick={() => {
        dispatch(setCurrentColId(curColumnId));
        showModal();
      }}
    >
      {toggleButtonText}
    </AddItemButton>
  );
};
