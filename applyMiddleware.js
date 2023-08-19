import { createStore, applyMiddleware } from "redux";

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

function logger() {
  return () => () => {
    console.log("Apply MiddleWare Working Successfully");
  };
}

const { dispatch } = createStore(todoReducer, [], applyMiddleware(logger));

dispatch({ type: "add_todo", payload: { todoText: "todo 1" } });

dispatch({ type: "delete_todo", payload: { todoId: 1 } });
