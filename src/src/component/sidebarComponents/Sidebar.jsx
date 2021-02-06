import React from "react";
import AddFolder from "./AddFolder.jsx";
import SidebarItem from "./SidebarItem.jsx";
import { AllFolderSvg } from "../Elements.jsx";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";

export default function Sidebar(props) {
  let history = useHistory();

  useEffect(() => {
    const listId = history.location.pathname.split("lists/")[1];
    if (props.lists) {
      const list = props.lists.find((list) => list.id === Number(listId));
      props.setActiveItem(list);
    }
  }, [props.lists, history.location.pathname]);

  return (
    <div className="sidebar">
      <div className="container">
        <div className="sidebar__menu">
          <div className="sidebar__menu_list">
            <SidebarItem
              items={[
                {
                  active: history.location.pathname === "/",
                  class: "sidebar__first-child",
                  icon: <AllFolderSvg />,
                  name: "Всі папки",
                },
              ]}
              onClickItem={(list) => {
                history.push(`/`);
              }}
            />
            {props.lists ? (
              <SidebarItem
                toogleFormClose={props.toogleFormClose}
                isRemovable={true}
                onRemove={(id) => {
                  const newLists = props.lists.filter((item) => item.id !== id);
                  props.setLists(newLists);
                }}
                items={props.lists}
                onClickItem={(list) => {
                  history.push(`/lists/${list.id}`);
                  props.setActiveItem(list);
                }}
                activeItem={props.activeItem}
              />
            ) : (
              "Завантаження..."
            )}

            <AddFolder onAddList={props.onAddList} colors={props.colors} />
          </div>
        </div>
      </div>
    </div>
  );
}
