import { createContext, useContext, Dispatch, useEffect } from "react";
import { appStateReducer, AppState, Stage, Lead } from "./appStateReducer";
import { Action } from "./actions";
import { useImmerReducer } from "use-immer";
import { DragItem } from "../DragItem";
import { save } from "../api";

import { withInitialState } from "../withInitialState";

type AppStateContextProps = {
  draggedItem: DragItem | null;
  stages: Stage[];
  getLeadsByListId(id: string): Lead[];
  dispatch: Dispatch<Action>;
  curColId: string | null;
  curLeadId: string | null;
};

const AppStateContext = createContext<AppStateContextProps>(
  {} as AppStateContextProps
);

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

    const { draggedItem, stages, curColId, curLeadId } = state;
    const getLeadsByListId = (id: string) => {
      return stages.find((stage) => stage.id === id)?.leads || [];
    };

    return (
      <AppStateContext.Provider
        value={{
          draggedItem,
          stages,
          getLeadsByListId,
          dispatch,
          curColId,
          curLeadId,
        }}
      >
        {children}
      </AppStateContext.Provider>
    );
  }
);

export const useAppState = () => {
  return useContext(AppStateContext);
};
