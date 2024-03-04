import style from "./CounterCard.module.css";

const CounterCard = ({ icons, descText, counterNumber }) => {
  return (
    <div className={style.CounterCard}>
      <p className={style.icons}>{icons}</p>
      <div className={style.text_box}>
        <p className={style.tit}>{descText}</p>
        <p className={style.num}>{counterNumber}</p>
      </div>
    </div>
  );
};
export default CounterCard;
