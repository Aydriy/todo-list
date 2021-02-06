import React from "react";
import classNames from "classnames";
import { Badge, Pen } from "../Elements.jsx";
import axios from "axios";

const SidebarItem = ({
  items,
  isRemovable,
  onClick,
  onRemove,
  onClickItem,
  activeItem,
  toogleFormClose,
}) => {
  const removeList = (item) => {
    if (window.confirm("Видалити?")) {
      axios.delete("http://localhost:3001/lists/" + item.id).then(() => {
        onRemove(item.id);
      });
    }
  };

  return (
    <ul onClick={onClick}>
      {items.map((item, index) => (
        <li
          onClick={onClickItem ? () => onClickItem(item) : null}
          key={index}
          className={classNames(item.class, {
            active: item.active
              ? item.active
              : activeItem && activeItem.id === item.id,
          })}
        >
          <div
            onClick={toogleFormClose}
            className="sidebar__menu_list_container"
          >
            {item.icon ? item.icon : <Badge color={item.color.hex} />}
            <span>
              <p className="folder-name">{item.name}</p>
              {/* <Pen /> лишати редагування назви тут чи ні? вирішити! */}
            </span>
            {item.tasks && item.tasks.length > 0 && (
              <div
                className="container-count-tasks"
                style={{ backgroundColor: `${item.color.hex}` }}
              >
                <p className="count-tasks">{item.tasks.length}</p>
              </div>
            )}

            {isRemovable && (
              <svg
                onClick={() => removeList(item)}
                className="sidebar__menu_list_x"
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className="x_color"
                  d="M6.24741 5L9.73899 1.50842C9.9047 1.343 9.99791 1.11853 9.99812 0.884393C9.99832 0.650251 9.90551 0.425617 9.74009 0.259907C9.57468 0.0941973 9.35021 0.000986589 9.11606 0.000779811C8.88192 0.000573033 8.65729 0.0933872 8.49158 0.258804L5 3.75038L1.50842 0.258804C1.34271 0.0930948 1.11796 0 0.883613 0C0.649264 0 0.424514 0.0930948 0.258804 0.258804C0.0930948 0.424514 0 0.649264 0 0.883613C0 1.11796 0.0930948 1.34271 0.258804 1.50842L3.75038 5L0.258804 8.49158C0.0930948 8.65729 0 8.88204 0 9.11639C0 9.35074 0.0930948 9.57549 0.258804 9.7412C0.424514 9.90691 0.649264 10 0.883613 10C1.11796 10 1.34271 9.90691 1.50842 9.7412L5 6.24962L8.49158 9.7412C8.65729 9.90691 8.88204 10 9.11639 10C9.35074 10 9.57549 9.90691 9.7412 9.7412C9.90691 9.57549 10 9.35074 10 9.11639C10 8.88204 9.90691 8.65729 9.7412 8.49158L6.24741 5Z"
                  fill="#fda085"
                />
              </svg>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default SidebarItem;
