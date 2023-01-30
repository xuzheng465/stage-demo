import { createContext, useContext, FC, Dispatch, ReactNode } from "react";
import { appStateReducer, AppState, List, Task } from "./appStateReducer";
import { Action } from "./actions";
import { useImmerReducer } from "use-immer";
import { DragItem } from "../DragItem";

type AppStateContextProps = {
  draggedItem: DragItem | null;
  lists: List[];
  getTasksByListId(id: string): Task[];
  dispatch: Dispatch<Action>;
};

const AppStateContext = createContext<AppStateContextProps>(
  {} as AppStateContextProps
);

const appData: AppState = {
  draggedItem: null,
  lists: [
    {
      id: "0",
      text: "To Do",
      tasks: [{ id: "c0", text: "Generate app scaffold" }],
    },
    {
      id: "1",
      text: "In Progress",
      tasks: [{ id: "c2", text: "Learn Typescript" }],
    },
    {
      id: "2",
      text: "Done",
      tasks: [{ id: "c3", text: "Begin to use static typing" }],
    },
  ],
};

const initialData: AppState = {
  draggedItem: null,
  lists: [
    {
      id: "0",
      text: "1-意向阶段",
      tasks: [
        { id: "c0", text: "Lead 1" },
        { id: "c1", text: "Lead 2" },
      ],
    },
    {
      id: "1",
      text: "2-沟通阶段",
      tasks: [{ id: "c2", text: "Lead 2" }],
    },
    {
      id: "2",
      text: "3-报价阶段",
      tasks: [{ id: "c3", text: "Lead 3" }],
    },
    {
      id: "3",
      text: "4-签约阶段",
      tasks: [{ id: "c4", text: "Lead 4" }],
    },
    {
      id: "4",
      text: "5-交车阶段",
      tasks: [{ id: "c5", text: "Lead 5" }],
    },
  ],
};

interface Props {
  children: React.ReactNode;
}

export const AppStateProvider: FC<Props> = ({ children }) => {
  // const { lists } = appData;
  const [state, dispatch] = useImmerReducer(appStateReducer, initialData);

  const { lists, draggedItem } = state;

  const getTasksByListId = (id: string) => {
    return lists.find((list) => list.id === id)?.tasks || [];
  };

  return (
    <AppStateContext.Provider
      value={{ draggedItem, lists, getTasksByListId, dispatch }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  return useContext(AppStateContext);
};
