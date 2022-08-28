import { useState } from "react";
import Btn from "../Btn/Btn";
import "./EditingForm.css";
import { ICollectionTask } from "../../models";
// форма редактирования 
interface IProps {
  element: any; // элемент li который редактируется
  collectionTask: ICollectionTask[]; // collectionTask - массив всех задач
  callActiveEditingForm: (value: boolean) => void; // callback меняющий значение activeEditingForm из компонента Todo 
  callEditTextElement: (value: ICollectionTask[]) => void; // callback меняющий значение collectionTask из компонента Todo
}

function EditingForm({
  element,
  collectionTask,
  callActiveEditingForm,
  callEditTextElement,
}: IProps) {
  const text = element.querySelector(".todo__text").innerText; // получаем текст из тега span редактируемого элемента (element)
  const id = element.id; // получаем id тега li редактируемого элемента (element)

  const [valueInput, setValueInput] = useState<string>(text);

  const editTask = () => { // редактируем нужный элемент массива и обновляем collectionTask
    collectionTask.forEach((value, index) => {
      if (value.id === id) {
        collectionTask[index].text = valueInput;

        callEditTextElement([...collectionTask]);
      }
    });
  };

  const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueInput(event.target.value);
  };

  const formSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    callActiveEditingForm(false);
    setValueInput("");
  };

  const closeChange = () => { // изменяем значение activeEditingForm для того что бы закрыть форму редактирования 
    callActiveEditingForm(false);
  };

  return (
    <div className="editing-box">
      <form className="editing-form" onSubmit={formSubmit}>
        <input
          type="text"
          className="editing-form__input"
          value={valueInput}
          onChange={inputChange}
        />
        <Btn
          call={editTask}
          text={"Сохранить"}
          styleBtn={"editing-form__btn-box"}
          typeBtn={"submit"}
        />
        <Btn
          call={closeChange}
          text={"Отмена"}
          styleBtn={"editing-form__btn-box"}
          typeBtn={"button"}
        />
      </form>
    </div>
  );
}

export default EditingForm;
