// KanbanBoard.tsx
// import React, {useEffect, useState} from "react";
// import {useDispatch, useSelector} from "react-redux";
// import {addTask, updateTask, deleteTask} from "../../redux/actions";
// import {RootState} from "../../redux/store";
// import TaskModal from "../TaskModal";
//
// interface KanbanBoardProps {
//   openModal: (type: "view" | "edit" | "delete" | "add", task?: any) => void;
//   isModalOpen: boolean;
//   closeModal: () => void;
// }
//
// const KanbanBoard: React.FC<KanbanBoardProps> = ({openModal, isModalOpen, closeModal}) => {
//   const dispatch = useDispatch();
//   const data = useSelector((state: RootState) => state);
//   const [modalType, setModalType] = useState<"view" | "edit" | "delete" | "add">("view");
//   const [selectedTask, setSelectedTask] = useState<any>(null);
//   const [boardIndex, setBoardIndex] = useState<number>(0);
//   const [columnIndex, setColumnIndex] = useState<number>(0);
//   const [taskIndex, setTaskIndex] = useState<number>(0);
//
//   useEffect(() => {
//     if (!localStorage.getItem("kanbanState")) {
//       localStorage.setItem("kanbanState", JSON.stringify(data));
//     }
//   }, [data]);
//
//   const handleOpenModal = (type: "view" | "edit" | "delete" | "add", task: any = null, boardIdx = 0, columnIdx = 0, tIndex: number) => {
//     setModalType(type);
//     setSelectedTask(task);
//     setBoardIndex(boardIdx);
//     setColumnIndex(columnIdx);
//     setTaskIndex(tIndex);
//     openModal(type, task);
//   };
//
//   const handleAddTask = (boardIndex: number, columnIndex: number) => {
//     const newTask = {
//       title: "New Task",
//       description: "",
//       status: data.boards[boardIndex].columns[columnIndex].name,
//       subtasks: []
//     };
//     dispatch(addTask(boardIndex, columnIndex, newTask));
//     closeModal();
//   };
//
//   const handleUpdateTask = (updatedTask: any) => {
//     dispatch(updateTask(boardIndex, columnIndex, taskIndex, updatedTask));
//     closeModal();
//   };
//
//   const handleDeleteTask = () => {
//     dispatch(deleteTask(boardIndex, columnIndex, taskIndex));
//     closeModal();
//   };
//
//   return (
//     <div style={{display: 'flex', justifyContent: 'space-between'}}>
//       {data.boards[0].columns.map((column, columnIndex) => (
//         <div key={columnIndex} style={{fontSize: '1.5rem', width: '30%', padding: '10px', border: '1px solid #ccc'}}>
//           <h3>{column.name}</h3>
//           {column.tasks.map((task, taskIndex) => (
//             <div
//               key={taskIndex}
//               style={{marginBottom: '10px', padding: '10px', border: '1px solid #ddd'}}
//               onClick={() => handleOpenModal("view", task, 0, columnIndex)}
//             >
//               <h4>{task.title}</h4>
//               <br/>
//               <p>{task.subtasks.filter(item => item.isCompleted).length} of {task.subtasks.length} subtasks</p>
//             </div>
//           ))}
//           <button onClick={() => handleOpenModal("add", null, 0, columnIndex)}>Add Task</button>
//         </div>
//       ))}
//       <TaskModal
//         isOpen={isModalOpen}
//         onClose={closeModal}
//         task={selectedTask}
//         type={modalType}
//         onSave={modalType === "add" ? handleAddTask : handleUpdateTask}
//         onDelete={handleDeleteTask}
//         boardIndex={boardIndex}
//         columnIndex={columnIndex}
//         taskIndex={taskIndex}
//       />
//
//
//     </div>
//   );
// };
//
// export default KanbanBoard;
