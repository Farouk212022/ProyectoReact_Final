export const actions = {
  ADD_TASK: "ADD_TASK",
  DELETE_TASK: "DELETE_TASK",
  UPDATE_TASK: "UPDATE_TASK",
  SET_TASKS: "SET_TASKS",
  SET_LOADING: "SET_LOADING",
  SET_ERROR: "SET_ERROR",
  TOGGLE_TASK_STATUS: "TOGGLE_TASK_STATUS",
};

export const initialState = {
  tasks: [],
  loading: false,
  error: null,
};

export const taskReducer = (state, action) => {
  switch (action.type) {
    case actions.SET_TASKS:
      console.log("Actualizando tareas", action.payload);
      return { ...state, tasks: action.payload };

    case actions.ADD_TASK:
      return { ...state, tasks: [...state.tasks, action.payload] };

    case actions.DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };

    case actions.UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id
            ? { ...task, ...action.payload.updatedTask }
            : task
        ),
      };

    case actions.TOGGLE_TASK_STATUS:
      console.log(
        "TOGGLE_TASK_STATUS ejecutado para la tarea con ID:",
        action.payload
      );
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload
            ? { ...task, terminado: !task.terminado }
            : task
        ),
      };

    case actions.SET_LOADING:
      return { ...state, loading: action.payload };

    case actions.SET_ERROR:
      return { ...state, error: action.payload };

    default:
      return state;
  }
};
