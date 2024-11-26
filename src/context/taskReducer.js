export const actions = {
  ADD_TASK: "ADD_TASK",
  DELETE_TASK: "DELETE_TASK",
  UPDATE_TASK: "UPDATE_TASK",
  SET_TASKS: "SET_TASKS",
  SET_LOADING: "SET_LOADING",
  SET_ERROR: "SET_ERROR",
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
      return { ...state, tasks: state.tasks.filter(task => task.id !== action.payload) };
    case actions.SET_LOADING:
      return { ...state, loading: action.payload };
    case actions.SET_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
