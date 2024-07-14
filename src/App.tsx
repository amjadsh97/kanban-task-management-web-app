// App.tsx
import React, {useEffect, useState} from "react";
import Header from "./components/Header";
import KanbanBoard from "./components/KanbanBoard";
import logoDark from "./assets/images/logo-dark.svg";
import {
  iconBoard,
  iconLightTheme,
  iconDarkTheme,
  iconHideSidebar,
  iconShowSidebar,
  iconColoredBoard
} from "./assets/icons";
import "./styles/reset.css";
import "./styles/App.css";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./redux/store";
import {addTask, deleteTask, updateTask, addBoard, addColumn} from "./redux/actions";
import TaskModal from "./components/TaskModal";
import AddBoardModal from "./components/BoardModal";
import AddColumnModal from "./components/ColumnModal";
import {initialData} from "./types";

function App() {
  const [theme, setTheme] = useState<string>("light");
  const [showSidebar, setShowSidebar] = useState<boolean>(true);
  const [modalTaskOpened, setModalTaskOpen] = useState(false);
  const [modalType, setModalType] = useState<"view" | "edit" | "delete" | "add">("view");
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [addBoardModalOpen, setAddBoardModalOpen] = useState(false);
  const [addColumnModalOpen, setAddColumnModalOpen] = useState(false);

  const data = useSelector((state: RootState) => state);
  const boards = data.boards
  const [boardIndex, setBoardIndex] = useState<number>(0);
  const [columnIndex, setColumnIndex] = useState<number>(0);
  const [activeBoard, setActiveBoard] = useState(0);
  const [taskIndex, setTaskIndex] = useState<number>(0);
  const [mobileDropdownTrigger, setMobileDropdownTrigger] = useState<boolean>(false)
  const dispatch = useDispatch();


  const handleThemeChange = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const openModal = (type: "view" | "edit" | "delete" | "add", task: any = null, bIndex: number = 0, cIndex: number = 0, tIndex: number = 0) => {
    setModalType(type);
    setSelectedTask(task);
    setBoardIndex(bIndex);
    setColumnIndex(cIndex);
    setTaskIndex(tIndex);
    setModalTaskOpen(true);
  };


  const closeTaskModal = () => {
    setModalTaskOpen(false);
    setModalType("view"); // Reset modalType to "view" when closing the modal
  };

  const closeBoardModal = () => {
    setAddBoardModalOpen(false);
  };


  const handleUpdateTask = (updatedTask: any) => {
    dispatch(updateTask(boardIndex, columnIndex, taskIndex, updatedTask));
    closeTaskModal();
  };

  const handleDeleteTask = () => {
    dispatch(deleteTask(boardIndex, columnIndex, taskIndex));
    closeTaskModal();
  };

  const handleAddBoard = (boardName: string) => {
    dispatch(addBoard({name: boardName, columns: []}));
    setAddBoardModalOpen(false);
  };

  const handleAddColumn = (columnName: string) => {
    dispatch(addColumn(activeBoard, {name: columnName, tasks: []}));
    setAddColumnModalOpen(false);
  };

  useEffect(() => {
    if (!localStorage.getItem("reduxState")) {
      localStorage.setItem("reduxState", JSON.stringify(initialData));
    }
  }, []);

  useEffect(() => {
    const body = document.querySelector("body") as HTMLElement;
    if (theme === "dark") {
      return body.classList.add("dark");
    }
    return body.classList.remove("dark");
  }, [theme])

  return (
    <div className={`app ${showSidebar ? "sidebar-opened" : ""} ${theme === "dark" ? "dark" : ""}  ${mobileDropdownTrigger ? "mobile-dropdown-opened" : ""}`}>
      <Header  mobileDropdownTrigger={mobileDropdownTrigger} setMobileDropdownTrigger={setMobileDropdownTrigger} activeBoardIndex={activeBoard} openModal={(type, task) => openModal(type, task)}/>
      <aside className='sidebar'>
        <div className="sidebar-inner">
          <h1 className="logo">
            <img src={logoDark} alt="Logo"/>
          </h1>
          <span className='sidebar-title'>All Boards</span>
          <ul className='boards-list'>
            {data.boards.map((board, index) => (
              <li className={`board-item ${activeBoard === index ? "active" : ""}`}
                  onClick={() => setActiveBoard(index)} key={board.name}>
                <img src={iconBoard} alt="Board Icon"/>
                <span>{board.name}</span>
              </li>
            ))}
            <li className='board-item colored' onClick={() => setAddBoardModalOpen(true)}>
              <img src={iconColoredBoard} alt="Board Icon"/>
              <span>+ Create New Board</span>
            </li>
          </ul>

        </div>

        <div className="theme-wrapper">
          <img src={iconLightTheme} alt="Light Theme Icon"/>
          <div className={`switch-theme ${theme}`} onClick={handleThemeChange}></div>
          <img src={iconDarkTheme} alt="Dark Theme Icon"/>
        </div>

        <button className="hide-sidebar" onClick={() => setShowSidebar(!showSidebar)}>
          <img src={iconHideSidebar} alt="Hide Sidebar Icon"/>
          <span>Hide Sidebar</span>
        </button>
      </aside>

      <div className={`mobile-dropdown-wrapper`}>
        <div className="mobile-dropdown">
          <p className='body-l'>ALL BOARDS ({boards.length})</p>
          <ul className='boards-list'>
            {data.boards.map((board, index) => (
              <li className={`board-item ${activeBoard === index ? "active" : ""}`}
                  onClick={() => setActiveBoard(index)} key={board.name}>
                <img src={iconBoard} alt="Board Icon"/>
                <span>{board.name}</span>
              </li>
            ))}
            <li className='board-item' onClick={() => setAddBoardModalOpen(true)}>
              <img src={iconColoredBoard} alt="Board Icon"/>
              <span>+ Create New Board</span>
            </li>
          </ul>
          <div className="theme-wrapper">
            <img src={iconLightTheme} alt="Light Theme Icon"/>
            <div className={`switch-theme ${theme}`} onClick={handleThemeChange}></div>
            <img src={iconDarkTheme} alt="Dark Theme Icon"/>
          </div>

        </div>
      </div>
      <main className='main'>
        <div className='columns-wrapper'>
          {data.boards[activeBoard]?.columns.map((column, columnIndex) => (
            <div key={columnIndex} className='column'>
              <h3 className='column-title'>{column.name}</h3>
              {column.tasks.map((task, taskIndex) => (
                <div
                  key={taskIndex}
                  className='task-item'
                  onClick={() => openModal("view", task, activeBoard, columnIndex, taskIndex)}
                >
                  <h4 className='task-title'>{task.title}</h4>
                  <p
                    className='subtasks-status'>{task.subtasks.filter(item => item.isCompleted).length} of {task.subtasks.length} subtasks</p>
                </div>
              ))}
            </div>
          ))}
          {/*<button className='add-column' onClick={() => setAddBoardModalOpen(true)}>+ Add Column</button>*/}
        </div>
      </main>
      {modalTaskOpened && (
        <TaskModal
          isOpen={modalTaskOpened}
          onClose={closeTaskModal}
          task={selectedTask}
          type={modalType}
          onSave={handleUpdateTask}
          onDelete={handleDeleteTask}
          boardIndex={activeBoard}
          columnIndex={columnIndex}
          taskIndex={taskIndex}
        />
      )}
      {addBoardModalOpen && (
        <AddBoardModal
          isOpen={addBoardModalOpen}
          onClose={closeBoardModal}
          onSave={handleAddBoard}
        />
      )}

      <footer></footer>
      <button onClick={() => setShowSidebar((prev) => !prev)} className='show-sidebar'>
        <img src={iconShowSidebar} alt="Show Sidebar Icon"/>
      </button>
    </div>
  );
}

export default App;

