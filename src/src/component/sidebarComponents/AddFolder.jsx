import React, { useState, useEffect } from "react";
import SidebarItem from "./SidebarItem.jsx";
import { Plus, CancelFolder, Badge } from "../Elements";
import axios from "axios";

const AddFolder = ({ colors, onAddList }) => {
  const [showForm, setShowForm] = useState(false);
  const [selectedColor, setselectedColor] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    if (Array.isArray(colors)) {
      setselectedColor(colors[0].id);
    }
  }, [colors]);

  const onClose = () => {
    setShowForm(false);
    setInputValue("");
  };
  const addList = () => {
    if (!inputValue) {
      alert("Введіть назву папки");
      return;
    }
    setisLoading(true);
    axios
      .post("http://localhost:3001/lists", {
        name: inputValue,
        colorId: selectedColor,
      })
      .then(({ data }) => {
        const color = colors.filter((c) => c.id === selectedColor)[0].hex;
        const lostObj = { ...data, color: { hex: color } };

        onAddList(lostObj);
        onClose();
      })
      .catch(() => {
        alert("Помилка...");
      })
      .finally(() => {
        setisLoading(false);
      });
    window.location.reload();
  };

  return (
    <div className="add-list">
      <SidebarItem
        onClick={() => (setShowForm(!showForm), setselectedColor(colors[0].id))}
        items={[
          {
            class: "sidebar__add-folder",
            icon: <Plus />,
            name: "Додати папку",
          },
        ]}
      />
      {showForm && (
        <div className="add-list__form">
          <div onClick={onClose} className="add-list__button-close">
            <CancelFolder />
          </div>

          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            type="text"
            placeholder="Назва папки"
            className="add-list__input-add-folder field"
          />
          <div className="add-list__colors">
            <ul>
              {colors.map((color) => (
                <li key={color.id}>
                  <Badge
                    onClick={() => setselectedColor(color.id)}
                    color={color.hex}
                    className={selectedColor === color.id && "badge__active"}
                  />
                </li>
              ))}
            </ul>
          </div>
          {isLoading ? (
            <button
              onClick={addList}
              className="add-list__button buttonAdd buttonAddLoad"
              disabled
            >
              Завантаження...
            </button>
          ) : (
            <button onClick={addList} className="add-list__button buttonAdd">
              Додати
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default AddFolder;
