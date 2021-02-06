import React from "react";
import { Pen, Check, CancelFolder, Plus } from "../Elements.jsx";
import axios from "axios";
import styled from "styled-components";
import AddTask from "./AddTask";
import Task from "./Task";

const TodoList = ({
  list,
  onEditTitle,
  onAddTask,
  visibleForm,
  setvisibleForm,
  inputValue,
  setInputValue,
  toogleForm,
  withoutEmpty,
  onRemoveTask,
  onEditTask,
}) => {
  const editTitle = () => {
    const newTitle = window.prompt("Назва папки", list.name);
    if (newTitle) {
      onEditTitle(list.id, newTitle);
      axios
        .patch("http://localhost:3001/lists/" + list.id, {
          name: newTitle,
        })
        .catch(() => {
          alert("Помилка при зміні назви! ");
        });
    }
  };

  return (
    <div className="todo-list">
      <div className="tasks">
        <h2 className="tasks__title" style={{ color: `${list.color.hex}` }}>
          {list.name}
          <Pen editTitle={editTitle} />
        </h2>

        {list.tasks.map((task) => (
          <Task
            onEdit={onEditTask}
            onRemove={onRemoveTask}
            key={task.id}
            {...task}
            list={list}
          />
        ))}
        <AddTask
          toogleForm={toogleForm}
          inputValue={inputValue}
          setInputValue={setInputValue}
          visibleForm={visibleForm}
          setvisibleForm={setvisibleForm}
          list={list}
          onAddTask={onAddTask}
        />
      </div>

      {!withoutEmpty && !list.tasks.length && <h2 className="empty">Пусто</h2>}
    </div>
  );
};
export default TodoList;
