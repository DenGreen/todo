import React, { useEffect, useState } from "react";
import "./Todo.css";
import Btn from "../../Components/Btn/Btn";
import EditingForm from "../../Components/EditingForm/EditingForm";
import TodoItem from "../../Components/TodoItem/TodoItem";
import {ICollectionTask} from "../../models";

// основной компонент Todo 

function store() { // достаем массив с задачами в localStorage. Если localStorage пуст, то возвращаем пустой массив
  if (localStorage.getItem("CollectionTask")) {
    const collectionTaskStore: ICollectionTask[] = JSON.parse(
      localStorage.getItem("CollectionTask")!
    );

    return collectionTaskStore;
  }

  return [];
}

function Todo() {
  const [valueInput, setValueInput] = useState<string>(""); // значение input 
  const [collectionTask, setCollectionTask] = useState<ICollectionTask[]>(
    store()
  ); // массив задачь 
  const [activeEditingForm, setActiveEditingForm] = useState<boolean>(false); // активирует и дезактивирует форму редактирования задач
  const [editElement, setEditElement] = useState(); // элемент li который редактируем 

  useEffect(() => {
    localStorage.setItem("CollectionTask", JSON.stringify(collectionTask)); // при изменении массива задач, сохраняем его в localStorage
  }, [collectionTask]);

  const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueInput(event.target.value);
  };

  const formSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValueInput("");
  };

  const addingNewTask = () => { // добавляем новую задачу 
    setCollectionTask([
      ...collectionTask,
      { text: valueInput, check: false, id: Math.random() + "" },
    ]);
  };

  return (
    <>
      <main className="main">
        <form className="todo__form" onSubmit={formSubmit}>
          <input
            className="todo__input"
            type="text"
            maxLength={100}
            value={valueInput}
            onChange={inputChange}
          />
          <Btn
            call={addingNewTask}
            text={"Добавить задачу"}
            styleBtn={"todo__form-btn"}
            typeBtn={"submit"}
          />
        </form>

        <ul className="todo__box">
          <TodoItem
            collectionTask={collectionTask}
            callCollectionTask={(value: ICollectionTask[]) =>
              setCollectionTask(value)
            }
            callActiveEditingForm={(value: boolean) =>
              setActiveEditingForm(value)
            }
            callEditElement={(value: any) => setEditElement(value)}
          />
        </ul>
      </main>
      {activeEditingForm && (
        <EditingForm
          element={editElement}
          collectionTask={collectionTask}
          callActiveEditingForm={(value: boolean) =>
            setActiveEditingForm(value)
          }
          callEditTextElement={(value: ICollectionTask[]) =>
            setCollectionTask(value)
          }
        />
      )}
    </>
  );
}

export default Todo;
