// // reducer.ts
// import { ADD_TASK, UPDATE_TASK, DELETE_TASK} from "../constants.ts"
// import {initialDataType, initialData} from "../../types";
//
// const reducer = (state = initialData, action: any): initialDataType => {
//   switch (action.type) {
//     case ADD_TASK:
//       return {
//         ...state,
//         boards: state.boards.map((board, bIndex) =>
//           bIndex === action.payload.boardIndex
//             ? {
//               ...board,
//               columns: board.columns.map((column, cIndex) =>
//                 cIndex === action.payload.columnIndex
//                   ? {
//                     ...column,
//                     tasks: [...column.tasks, action.payload.task]
//                   }
//                   : column
//               )
//             }
//             : board
//         )
//       };
//
//     case UPDATE_TASK:
//       const { task, oldStatus } = action.payload;
//       return {
//         ...state,
//         boards: state.boards.map(board => ({
//           ...board,
//           columns: board.columns.map(column => {
//             if (column.name === oldStatus) {
//               // Remove the task from the old column
//               const updatedTasks = column.tasks.filter(t => t.title !== task.title);
//               return { ...column, tasks: updatedTasks };
//             } else if (column.name === task.status) {
//               // Add the task to the new column
//               return { ...column, tasks: [...column.tasks, task] };
//             }
//             return column;
//           })
//         }))
//       };
//
//     case DELETE_TASK:
//       return {
//         ...state,
//         boards: state.boards.map((board, bIndex) =>
//           bIndex === action.payload.boardIndex
//             ? {
//               ...board,
//               columns: board.columns.map((column, cIndex) =>
//                 cIndex === action.payload.columnIndex
//                   ? {
//                     ...column,
//                     tasks: column.tasks.filter((_, tIndex) => tIndex !== action.payload.taskIndex)
//                   }
//                   : column
//               )
//             }
//             : board
//         )
//       };
//
//     default:
//       return state;
//   }
// };
//
// export default reducer;


// reducers.ts
import { TaskActionTypes, ColumnActionTypes, BoardActionTypes } from "./actions";
import { ADD_TASK, UPDATE_TASK, DELETE_TASK, ADD_COLUMN, UPDATE_COLUMN, DELETE_COLUMN, ADD_BOARD, UPDATE_BOARD, DELETE_BOARD } from "../constants.ts";
import {AppState} from "../../types";

const initialState:AppState = {
  boards: []
};



const rootReducer = (state = initialState, action: TaskActionTypes | ColumnActionTypes | BoardActionTypes) => {
  switch (action.type) {
    case ADD_TASK: {
      const { boardIndex, columnIndex, task } = action.payload;
      const updatedBoards = [...state.boards];

      // Ensure that boardIndex is valid
      if (!updatedBoards[boardIndex]) {
        console.error(`Invalid boardIndex: ${boardIndex}`);
        return state;
      }

      // Ensure that columns are initialized for the board
      if (!updatedBoards[boardIndex].columns) {
        updatedBoards[boardIndex].columns = [];
      }

      // Ensure that columnIndex is valid
      if (!updatedBoards[boardIndex].columns[columnIndex]) {
        console.error(`Invalid columnIndex: ${columnIndex}`);
        return state;
      }

      // Ensure that tasks array is initialized for the column
      if (!updatedBoards[boardIndex].columns[columnIndex].tasks) {
        updatedBoards[boardIndex].columns[columnIndex].tasks = [];
      }

      // Push the new task
      updatedBoards[boardIndex].columns[columnIndex].tasks.push(task);

      return { ...state, boards: updatedBoards };

      updatedBoards[boardIndex].columns[columnIndex].tasks.push(task);
      return { ...state, boards: updatedBoards };
    }
    // case UPDATE_TASK: {
    //   const { boardIndex, columnIndex, taskIndex, task } = action.payload;
    //   const newState = { ...state };
    //   newState.boards[boardIndex].columns[columnIndex].tasks[taskIndex] = task;
    //   return newState;
    // }

    case UPDATE_TASK: {
      const { boardIndex, columnIndex, taskIndex, task } = action.payload;
      const newState = { ...state };

      // Check if the status has changed
      const currentColumnIndex = columnIndex;
      const newColumnIndex = newState.boards[boardIndex].columns.findIndex(column => column.name === task.status);

      if (currentColumnIndex !== newColumnIndex) {
        // Remove the task from the current column
        newState.boards[boardIndex].columns[currentColumnIndex].tasks.splice(taskIndex, 1);

        // Add the task to the new column
        newState.boards[boardIndex].columns[newColumnIndex].tasks.push(task);
      } else {
        // If the status hasn't changed, just update the task in the same column
        newState.boards[boardIndex].columns[currentColumnIndex].tasks[taskIndex] = task;
      }

      return newState;
    }


    case DELETE_TASK: {
      const { boardIndex, columnIndex, taskIndex } = action.payload;
      const updatedBoards = [...state.boards];
      updatedBoards[boardIndex].columns[columnIndex].tasks.splice(taskIndex, 1);
      return { ...state, boards: updatedBoards };
    }
    case ADD_COLUMN: {
      const { boardIndex, column } = action.payload;
      const updatedBoards = [...state.boards];
      console.log({ boardIndex, column });
      updatedBoards[boardIndex]?.columns.push(column);
      return { ...state, boards: updatedBoards };
    }
    case UPDATE_COLUMN: {
      const { boardIndex, columnIndex, column } = action.payload;
      const updatedBoards = [...state.boards];
      updatedBoards[boardIndex].columns[columnIndex] = column;
      return { ...state, boards: updatedBoards };
    }
    case DELETE_COLUMN: {
      const { boardIndex, columnIndex } = action.payload;
      const updatedBoards = [...state.boards];
      updatedBoards[boardIndex].columns.splice(columnIndex, 1);
      return { ...state, boards: updatedBoards };
    }
    case ADD_BOARD: {
      const { board } = action.payload;
      return { ...state, boards: [...state.boards, board] };
    }
    case UPDATE_BOARD: {
      const { boardIndex, board } = action.payload;
      const updatedBoards = [...state.boards];
      updatedBoards[boardIndex] = board;
      return { ...state, boards: updatedBoards };
    }
    case DELETE_BOARD: {
      const { boardIndex } = action.payload;
      const updatedBoards = [...state.boards];
      updatedBoards.splice(boardIndex, 1);
      return { ...state, boards: updatedBoards };
    }
    default:
      return state;
  }
};

export default rootReducer;
