import { createStore, bindActionCreators, combineReducers } from "redux";

function todoReducer(state = [], action) {
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

function userReducer(state = [], action) {
  if (action.type == "add_user") {
    const userName = action.payload.userName;
    return [
      ...state,
      {
        name: userName,
        id: state.length == 0 ? 1 : state[state.length - 1].id + 1,
      },
    ];
  }
  return state;
}

// Combine Reducers

const reducers = combineReducers({ todo: todoReducer, users: userReducer });

const { dispatch, subscribe, getState, replaceReducer } = createStore(reducers);

// Action Objects => Action Methods (Action Creator)
const AddTodo = (todoText) => ({
  type: "add_todo",
  payload: { todoText: todoText },
});

const DeleteTodo = (id) => ({
  type: "delete_todo",
  payload: { todoId: id },
});

const AddUser = (userName) => ({
  type: "add_user",
  payload: { userName: userName },
});

subscribe(() => console.log(getState()));

// Binding Action Creator With Dispatch Methods
const actions = bindActionCreators({ AddTodo, DeleteTodo, AddUser }, dispatch);

actions.AddTodo("Todo 1");
actions.AddTodo("Todo 2");
actions.AddUser("Satyam");

actions.DeleteTodo(1);
