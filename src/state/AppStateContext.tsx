import {
  createContext,
  useContext,
  FC,
  Dispatch,
  useEffect,
  useState,
  useCallback,
} from "react";
import { appStateReducer, AppState, Stage, Lead } from "./appStateReducer";
import { Action } from "./actions";
import { useImmerReducer } from "use-immer";
import { DragItem } from "../DragItem";
import { load, save } from "../api";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { withInitialState } from "../withInitialState";

type AppStateContextProps = {
  draggedItem: DragItem | null;
  stages: Stage[];
  getLeadsByListId(id: string): Lead[];
  dispatch: Dispatch<Action>;
};

const AppStateContext = createContext<AppStateContextProps>(
  {} as AppStateContextProps
);

// const appData: AppState = {
//   draggedItem: null,
//   stages: [
//     {
//       id: "0",
//       text: "To Do",
//       leads: [{ id: "c0", text: "Generate app scaffold" }],
//     },
//     {
//       id: "1",
//       text: "In Progress",
//       leads: [{ id: "c2", text: "Learn Typescript" }],
//     },
//     {
//       id: "2",
//       text: "Done",
//       leads: [{ id: "c3", text: "Begin to use static typing" }],
//     },
//   ],
// };

// const initialData: AppState = {
//   draggedItem: null,
//   stages: [
//     {
//       id: "0",
//       text: "1-意向阶段",
//       leads: [
//         { id: "c0", text: "Lead 1" },
//         { id: "c1", text: "Lead 2" },
//       ],
//     },
//     {
//       id: "1",
//       text: "2-沟通阶段",
//       leads: [{ id: "c2", text: "Lead 2" }],
//     },
//     {
//       id: "2",
//       text: "3-报价阶段",
//       leads: [{ id: "c3", text: "Lead 3" }],
//     },
//     {
//       id: "3",
//       text: "4-签约阶段",
//       leads: [{ id: "c4", text: "Lead 4" }],
//     },
//     {
//       id: "4",
//       text: "5-交车阶段",
//       leads: [{ id: "c5", text: "Lead 5" }],
//     },
//   ],
// };

type AppStateProviderProps = {
  children: React.ReactNode;
  initialState: AppState;
};

export const AppStateProvider = withInitialState<AppStateProviderProps>(
  ({ children, initialState }) => {
    const [state, dispatch] = useImmerReducer(appStateReducer, initialState);

    useEffect(() => {
      save(state);
    }, [state]);

    const { draggedItem, stages } = state;
    const getLeadsByListId = (id: string) => {
      return stages.find((stage) => stage.id === id)?.leads || [];
    };

    return (
      <AppStateContext.Provider
        value={{ draggedItem, stages, getLeadsByListId, dispatch }}
      >
        {children}
      </AppStateContext.Provider>
    );
  }
);

export const useAppState = () => {
  return useContext(AppStateContext);
};
