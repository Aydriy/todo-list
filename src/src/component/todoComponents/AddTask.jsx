import React, { useState } from "react";
import { Plus } from "../Elements";
import styled from "styled-components";
import axios from "axios";

export default function AddTask({
  list,
  onAddTask,
  visibleForm,
  toogleForm,
  inputValue,
  setInputValue,
}) {
  const Div = styled.div`
    :active {
      background: ${list.color.hex};
      opacity: 0.8;
    }
  `;
  const Button = styled.button`
     {
      background: ${list.color.hex};
      opacity: 0.8;
    }
    :hover {
      background: ${list.color.hex};
      opacity: 1;
      box-shadow: inset 0 1px 1px rgba(27, 55, 212, 0.013),
        0 0 6px ${list.color.hex};
    }
    :active {
      opacity: 0.8;
    }
  `;

  const [isLoading, setIsLoading] = useState("");

  const toogleFormAdd = () => {
    if (!inputValue) {
      alert("Поле пусте!");
      return;
    }
    const obj = {
      listId: list.id,
      text: inputValue,
      completed: false,
    };
    setIsLoading(true);
    axios
      .post("http://localhost:3001/tasks", obj)
      .then(({ data }) => {
        console.log(data);
        onAddTask(list.id, data);
        setInputValue("");
      })
      .catch(() => {
        alert("Помилка...");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <div className="tasks__form">
      {!visibleForm ? (
        <Div className="tasks__form-new" onClick={toogleForm}>
          <Plus />
          <span>Нове завдання</span>
        </Div>
      ) : (
        <div className="tasks__form-input">
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            type="text"
            placeholder="Текст завдання"
            className="tasks__input field "
          />

          <div>
            <Button
              disabled={isLoading}
              onClick={toogleFormAdd}
              className="add-list__button-buttonAdd buttonAdd"
            >
              {isLoading ? "Додавання..." : "Додати"}
            </Button>
            <button
              onClick={toogleForm}
              className="add-list__button-buttonAdd--cancell buttonAdd"
            >
              Скасувати
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
