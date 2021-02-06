import React, { useState, useEffect } from "react";
import Sidebar from "./component/sidebarComponents/Sidebar.jsx";
import TodoList from "./component/todoComponents/TodoList.jsx";
import axios from "axios";
import { Route } from "react-router-dom";

function App() {
  const [lists, setLists] = useState(null);
  const [colors, setColors] = useState(null);
  const [activeItem, setActiveItem] = useState(null);
  const [visibleForm, setvisibleForm] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/lists?_expand=color&_embed=tasks")
      .then(({ data }) => {
        setLists(data);
      });
    axios.get("http://localhost:3001/colors").then(({ data }) => {
      setColors(data);
    });
  }, []);

  const onAddTask = (listId, taskObj) => {
    const newList = lists.map((item) => {
      if (item.id === listId) {
        item.tasks = [...item.tasks, taskObj];
      }
      return item;
    });
    setLists(newList);
  };

  const onRemoveTask = (listId, taskId) => {
    if (window.confirm("Видалити завдання?")) {
      const newList = lists.map((item) => {
        if (item.id === listId) {
          item.tasks = item.tasks.filter((task) => task.id !== taskId);
        }
        return item;
      });
      setLists(newList);
      axios.delete("http://localhost:3001/tasks/" + taskId).catch(() => {
        alert("Помилка при видаленні! ");
      });
    }
  };

  const onEditTask = (listId, taskObj) => {
    const newTaskText = window.prompt("Текст завдання", taskObj.text);

    if (!newTaskText) {
      return;
    }

    const newList = lists.map((list) => {
      if (list.id === listId) {
        list.tasks = list.tasks.map((task) => {
          if (task.id === taskObj.id) {
            task.text = newTaskText;
          }
          return task;
        });
      }
      return list;
    });
    setLists(newList);
    axios
      .patch("http://localhost:3001/tasks/" + taskObj.id, {
        text: newTaskText,
      })
      .catch(() => {
        alert("Помилка при видаленні! ");
      });
  };

  const onAddList = (obj) => {
    const newList = [...lists, obj];
    setLists(newList);
  };
  const onEditListTitle = (id, title) => {
    const newList = lists.map((item) => {
      if (item.id === id) {
        item.name = title;
      }
      return item;
    });
    setLists(newList);
  };

  const toogleForm = () => {
    setvisibleForm(!visibleForm);
    setInputValue("");
  };
  const toogleFormClose = () => {
    setvisibleForm(false);
    setInputValue("");
  };

  return (
    <div className="App">
      <Sidebar
        toogleFormClose={toogleFormClose}
        lists={lists}
        setLists={setLists}
        colors={colors}
        setColors={setColors}
        onAddList={onAddList}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
      />
      <div className="todo-list">
        <Route exact path="/">
          {lists &&
            lists.map((list) => (
              <TodoList
                key={list.id}
                toogleForm={toogleForm}
                inputValue={inputValue}
                setInputValue={setInputValue}
                visibleForm={visibleForm}
                setvisibleForm={setvisibleForm}
                list={list}
                onAddTask={onAddTask}
                onEditTitle={onEditListTitle}
                withoutEmpty
              />
            ))}
        </Route>
        {lists &&
        activeItem && (
          <TodoList
            onEditTask={onEditTask}
            onRemoveTask={onRemoveTask}
            toogleForm={toogleForm}
            inputValue={inputValue}
            setInputValue={setInputValue}
            visibleForm={visibleForm}
            setvisibleForm={setvisibleForm}
            list={activeItem}
            onAddTask={onAddTask}
            onEditTitle={onEditListTitle}
          />
        ) ? (
          lists &&
          activeItem && (
            <TodoList
              onEditTask={onEditTask}
              onRemoveTask={onRemoveTask}
              toogleForm={toogleForm}
              inputValue={inputValue}
              setInputValue={setInputValue}
              visibleForm={visibleForm}
              setvisibleForm={setvisibleForm}
              list={activeItem}
              onAddTask={onAddTask}
              onEditTitle={onEditListTitle}
            />
          )
        ) : (
          <h2 className="choise-folder">Виберіть папку</h2>
        )}
      </div>
    </div>
  );
}

export default App;
