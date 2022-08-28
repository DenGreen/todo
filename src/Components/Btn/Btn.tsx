import "./Btn.css";

interface IProps {
  call: (event: any) => void;
  text: string;
  styleBtn: string;
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
