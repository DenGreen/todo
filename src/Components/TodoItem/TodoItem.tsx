import React from "react";
import "./TodoItem.css";
import { ICollectionTask } from "../../models";
import Btn from "../Btn/Btn";

interface IProps {
  collectionTask: ICollectionTask[];
  callCollectionTask: (value: ICollectionTask[]) => void;
  callActiveEditingForm: (value: boolean) => void;
  callEditElement: (value: Element) => void;
}

function TodoItem({
  collectionTask,
  callCollectionTask,
  callActiveEditingForm,
  callEditElement,
}: IProps) {
  const editTask = (event: React.ChangeEvent<HTMLButtonElement>) => {
    const element = event.target.parentNode?.parentNode as HTMLElement;
    callEditElement(element);
    callActiveEditingForm(true);
  };

  const deleteTask = (event: React.ChangeEvent<HTMLButtonElement>) => {
    const element = event.target.parentNode?.parentNode as HTMLElement;
    const id = element?.id;

    callCollectionTask(collectionTask.filter((value) => value.id !== id));
  };

  const w = (event: React.ChangeEvent<HTMLInputElement>) => {
    const element = event.target.parentNode?.parentNode as HTMLElement;
    const id = element?.id;

    collectionTask.forEach((value, index) => {
      if (value.id === id) {
        collectionTask[index].check = event.target.checked;

        callCollectionTask([...collectionTask]);
      }
    });
  };

  return (
    <>
      {collectionTask.map((value) => {
        return (
          <li className="todo__item" id={value.id} key={value.id}>
            <div className="todo__text-box">
              <input
                className="todo__chec"
                type="checkbox"
                defaultChecked={value.check}
                onChange={w}
              />
              <span className="todo__text">{value.text}</span>
            </div>
            <div className="todo__btn-box">
              <Btn
                call={editTask}
                text={"Редактировать"}
                styleBtn={"todo__item-btn"}
                typeBtn={"button"}
              />
              <Btn
                call={deleteTask}
                text={"Удалить"}
                styleBtn={"todo__item-btn"}
                typeBtn={"button"}
              />
            </div>
          </li>
        );
      })}
    </>
  );
}

export default TodoItem;
