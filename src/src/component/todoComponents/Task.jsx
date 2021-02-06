import React from "react";
import { Pen, Check, CancelFolder } from "../Elements.jsx";
import styled from "styled-components";

export default function Task({ list, id, text, onRemove, onEdit }) {
  const Input = styled.input`
    :checked + label {
      background: ${list.color.hex};
      border-color: ${list.color.hex};
      transition: 0.3s;
      margin-right: 20px;
      svg {
        opacity: 1;
        display: block;
        transition: 0.3s;
      }
    }
  `;
  return (
    <div key={id} className="tasks__items">
      <div className="checkbox">
        <Input id={`task-${id}`} type="checkbox" />
        <label htmlFor={`task-${id}`}>
          <Check />
        </label>
      </div>
      <p className="testinput">{text}</p>
      <div className="row-actions">
        <div onClick={() => onEdit(list.id, { id, text })}>
          <Pen />
        </div>
        <div onClick={() => onRemove(list.id, id)}>
          <CancelFolder id={id} list={list} onRemove={onRemove} />
        </div>
      </div>
    </div>
  );
}
