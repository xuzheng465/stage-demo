import { useState } from "react";
import {
  NewItemFormContainer,
  NewItemButton,
  NewItemInput,
  CancelButton,
} from "./styles";
import { useFocus } from "./utils/useFocus";

type NewItemFormProps = {
  onAdd(text: string): void;
  closeForm(): void;
};

export const NewItemForm = ({ onAdd, closeForm }: NewItemFormProps) => {
  const [text, setText] = useState("");
  const inputRef = useFocus();

  const handleAddText = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (text === "") return;
      onAdd(text);
    }
  };

  return (
    <NewItemFormContainer>
      <NewItemInput
        ref={inputRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleAddText}
      />

      <NewItemButton
        onClick={() => {
          if (text !== "") onAdd(text);
        }}
      >
        Create
      </NewItemButton>
      <CancelButton onClick={() => closeForm()}>Cancel</CancelButton>
    </NewItemFormContainer>
  );
};
