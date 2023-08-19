import { createStore, bindActionCreators } from "redux";

function todoReducer(state, action) {
  if (action.type == "add_todo") {
    const todoText = action.payload.todoText;
    return [
      ...state,
      {
        text: todoText,
        isFinished: false,
        id: state.length == 0 ? 1 : state[state.length - 1].id + 1,
      },
    ];
  } else if (action.type == "delete_todo") {
    const todoId = action.payload.todoId;
    return state.filter((t) => t.id == todoId);
  } else if (action.type == "edit_todo") {
    const todo = action.payload.todo;
    const todoText = action.payload.todoText;
    return state.map((t) => {
      if (t.id == todo.id) {
        t.text = todoText;
      }
      return t;
    });
  }
  return state;
}

const { dispatch, subscribe, getState, replaceReducer } = createStore(
  todoReducer,
  []
);

// Action Objects => Action Methods (Action Creator)
const AddTodo = (todoText) => ({
  type: "add_todo",
  payload: { todoText: todoText },
});

const DeleteTodo = (id) => ({
  type: "delete_todo",
  payload: { todoId: id },
});

subscribe(() => console.log(getState()));

// Binding Action Creator With Dispatch Methods
const actions = bindActionCreators({ AddTodo, DeleteTodo }, dispatch);

actions.AddTodo("Todo 1");
actions.AddTodo("Todo 2");

actions.DeleteTodo(1);
