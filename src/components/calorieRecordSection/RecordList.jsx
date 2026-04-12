import CalorieRecord from "./CalorieRecord";
import styles from "./RecordList.module.css";

function RecordList(props) {
	return props.records?.length ? (
		<ul className={styles["record-list"]}>
			{props.records.map((record) => (
				<li className={styles["list-item"]} key={record.id}>
					<CalorieRecord
						date={record.date}
						meal={record.meal}
						content={record.content}
						calories={record.calories}
					/>
				</li>
			))}
		</ul>
	) :(<p className={styles.placeholder}>No records found.</p>)
}

export default RecordList;
