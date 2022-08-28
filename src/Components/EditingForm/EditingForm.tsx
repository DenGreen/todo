import { useState } from "react";
import Btn from "../Btn/Btn";
import "./EditingForm.css";
import { ICollectionTask } from "../../models";

interface IProps {
  element: any;
  collectionTask: ICollectionTask[];
  callActiveEditingForm: (value: boolean) => void;
  callEditTextElement: (value: ICollectionTask[]) => void;
}

function EditingForm({
  element,
  collectionTask,
  callActiveEditingForm,
  callEditTextElement,
}: IProps) {
  const text = element.querySelector(".todo__text").innerText;
  const id = element.id;

  const [valueInput, setValueInput] = useState<string>(text);

  const editTask = () => {
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

  const closeChange = () => {
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
