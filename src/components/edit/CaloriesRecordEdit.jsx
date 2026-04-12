import {useState} from "react";
import styles from "./CaloriesRecordEdit.module.css";

function CaloriesRecordEdit(props) {
	const DEFAULT_VALUES = {
		date: "",
		meal: "Breakfast",
		content: "",
		calories: 0,
	};
	const [mealRecord, setMealRecord] = useState(DEFAULT_VALUES);

	const onDateChangeHandler = (event) => {
		setMealRecord({...mealRecord, date: event.target.value});
	};
	const onMealChangeHandler = (event) => {
		setMealRecord({...mealRecord, meal: event.target.value});
	};

	const onContentChangeHandler = (event) => {
		setMealRecord({...mealRecord, content: event.target.value});
	};

	const onCaloriesChangeHandler = (event) => {
		setMealRecord({...mealRecord, calories: event.target.value});
	};

	const onSubmitHandler = (event) => {
		event.preventDefault();
		props.onFormSubmit(mealRecord);
		setMealRecord({
			...mealRecord,
			DEFAULT_VALUES,
		});
	};

	const onCancelHandler = () => {
		setMealRecord({
			...mealRecord,
			DEFAULT_VALUES,
		});
		props.onCancel();
	};

	return (
		<form className={styles.form} onSubmit={onSubmitHandler}>
			<label htmlFor="date">Date: </label>
			<input
				type="date"
				value={mealRecord.date}
				id="date"
				onChange={onDateChangeHandler}
			/>
			<label htmlFor="meal">Meal: </label>
			<select id="meal" onChange={onMealChangeHandler} value={mealRecord.meal}>
				<option value="Breakfast">Breakfast</option>
				<option value="Lunch">Lunch</option>
				<option value="Dinner">Dinner</option>
				<option value="Snack">Snack</option>
			</select>
			<label htmlFor="content">Content: </label>
			<input
				type="text"
				id="content"
				value={mealRecord.content}
				onChange={onContentChangeHandler}
			/>
			<label htmlFor="calories">Calories: </label>
			<input
				type="number"
				id="calories"
				value={mealRecord.calories}
				onChange={onCaloriesChangeHandler}
				className={`${styles["calories-input"]} ${
					mealRecord.calories < 0 ? styles.error : ""
				}`}
			/>
			<div className={styles.footer}>
				<button>Add Record</button>
				<button
					type="button"
					className={styles.secondary}
					onClick={onCancelHandler}
				>
					Cancel
				</button>
			</div>
		</form>
	);
}

export default CaloriesRecordEdit;
