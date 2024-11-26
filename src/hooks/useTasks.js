import { useCallback, useEffect } from "react";
import { useDispatchContext, useTaskContext } from "../context/taskCtx";
import { actions } from "../context/taskReducer";
import TasksDatabaseManagement from "../services/Firebase/Tasks/firebaseTaskDatabaseManagement";
import { type } from "@testing-library/user-event/dist/type";

const useTasks = () => {
  const dispatch = useDispatchContext();
  const state = useTaskContext();

  const fetchTasks = useCallback(async () => {
    dispatch({ type: actions.SET_LOADING, payload: true });
    console.log("fetchTasks");
    const taskManagement = new TasksDatabaseManagement();
    const userTasks = await taskManagement.traerTareas();
    console.log("userTasks", userTasks);
    dispatch({ type: actions.SET_TASKS, payload: userTasks });
    dispatch({ type: actions.SET_LOADING, payload: false });
  }, [dispatch]);

  const addTask = useCallback(async (task) => {
    dispatch({ type: actions.SET_LOADING, payload: true });
    const taskManagement = new TasksDatabaseManagement();
    try{
      await taskManagement.addTarea(task);
      dispatch({ type: actions.ADD_TASK, payload: task});
      fetchTasks();
      dispatch({ type: actions.SET_LOADING, payload: false });
    }catch(error){
      dispatch({ type: actions.SET_ERROR, payload: error });
    }
  },[dispatch, fetchTasks]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return {...state, addTask, dispatch};
};

export default useTasks;