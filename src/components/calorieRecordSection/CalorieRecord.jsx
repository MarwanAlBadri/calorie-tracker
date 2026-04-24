import { useEffect} from "react";
import styles from "./CalorieRecord.module.css";
import CalorieRecordDate from "./CalorieRecordDate";
import StyledRecordCell from "../common/StyledRecordCell";

function CalorieRecord(props) {
  if (props.calories<0) {
    return null;
  }

    useEffect(() => {
      props.addCalories((prevValue => prevValue + props.calories));
      return () => {
        props.addCalories((prevValue => prevValue - props.calories));
      };
    }, []);
  

    return (
        <ul className={styles.record}>
            <li>
                <CalorieRecordDate date={props.date} />
            </li>
            <li className={styles["record-calories"]}>{props.meal}</li>
            <li>{props.content}</li>
            <li>
                <StyledRecordCell className={styles["styled-record-cell"]}>
                    {props.calories}
                </StyledRecordCell>
            </li>
        </ul>
    );
}

export default CalorieRecord;
