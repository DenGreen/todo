import "./Btn.css";
// компонент кнопка
interface IProps {
  call: (event: any) => void; // функция обратного вызова
  text: string; // текст в кнопке 
  styleBtn: string; // className 
  typeBtn: "button" | "submit"; 
}

function Btn({ call, text, styleBtn, typeBtn }: IProps) {
  return (
    <button className={"todo__btn " + styleBtn} type={typeBtn} onClick={call}>
      {text}
    </button>
  );
}

export default Btn;
