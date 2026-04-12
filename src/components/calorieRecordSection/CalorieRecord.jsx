import styles from "./CalorieRecord.module.css";
import CalorieRecordDate from "./CalorieRecordDate";
import StyledRecordCell from "../common/StyledRecordCell";

function CalorieRecord(props) {
  return (
    <ul className={styles.record}>
      <li>
        <CalorieRecordDate date={props.date} />
      </li>
      {props.calories < 0 ? (
        <>
          <li></li>
          <li>Invalid Calories</li>
        </>
      ) : (
        <>
          <li className={styles["record-calories"]}>{props.meal}</li>
          <li>{props.content}</li>
        </>
      )}
      <li>
        <StyledRecordCell className={styles["styled-record-cell"]}>
          {props.calories}
        </StyledRecordCell>
      </li>
    </ul>
  );
}

export default CalorieRecord;
