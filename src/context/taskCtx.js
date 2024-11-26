import { createContext, useContext, useReducer } from "react";
import { initialState, taskReducer } from "./taskReducer";

const taskContext = createContext(null);
const taskDispatchContext = createContext(null);

export function useTaskContext() {
  const context = useContext(taskContext);
  if (!context) {
    throw new Error("useTask must be used within a TaskProvider");
  }
  return context;
}

export function useDispatchContext() {
  const context = useContext(taskDispatchContext);
  if (!context) {
    throw new Error("useTaskDispatch must be used within a TaskProvider");
  }
  return context;
}

export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  return (
    <taskContext.Provider value={state}>
      <taskDispatchContext.Provider value={dispatch}>
        {children}
      </taskDispatchContext.Provider>
    </taskContext.Provider>
  );
}
