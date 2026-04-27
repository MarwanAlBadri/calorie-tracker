import { useState, useEffect, useReducer, useContext } from "react";
import styles from "./CaloriesRecordEdit.module.css";
import { AppContext } from "../../AppContext";
const DEFAULT_VALUES = {
    meal: { value: "Breakfast", valid: true },
    content: { value: "", valid: false },
    calories: { value: 0, valid: true },
};

function formReducer(state, action) {
    const { type, key, value } = action;
    if (type === "RESET") {
        return DEFAULT_VALUES;
    }
    let valid;
    switch (key) {
        case "content":
            valid =
                (value === "sport" && state.calories.value < 0) ||
                (value !== "sport" && state.calories.value >= 0);
            return {
                ...state,
                content: { value, valid: !!value },
                calories: { ...state.calories, valid },
            };
        case "calories":
            valid =
                (state.content.value === "sport" && value < 0) ||
                (state.content.value !== "sport" && value >= 0);
            return {
                ...state,
                calories: { value, valid },
            };
        default:
            return {
                ...state,
                [key]: { value, valid: !!value },
            };
    }
}

function CaloriesRecordEdit(props) {
    const [isFormValid, setIsFormValid] = useState(false);
    const { currentDate, currentDateStr,isValidDate , setCurrentDate, totalCalories } = useContext(AppContext);

    const [formState, dispatchFn] = useReducer(formReducer, DEFAULT_VALUES);
    const {
        content: { valid: isContentValid },
        calories: { valid: isCaloriesValid },
    } = formState;

    useEffect(() => {
        setIsFormValid(isCaloriesValid && isContentValid && isValidDate);
    }, [isCaloriesValid, isContentValid, isValidDate]);

    const onDateChangeHandler = (event) => {
        setCurrentDate(event.target.value);
    };
    const onMealChangeHandler = (event) => {
        dispatchFn({
            type: "UPDATE_FIELD",
            key: "meal",
            value: event.target.value,
        });
    };

    const onContentChangeHandler = (event) => {
        dispatchFn({
            type: "UPDATE_FIELD",
            key: "content",
            value: event.target.value,
        });
        console.log(`content ${event.target.value}`);
    };

    const onCaloriesChangeHandler = (event) => {
        dispatchFn({
            type: "UPDATE_FIELD",
            key: "calories",
            value: Number(event.target.value),
        });
    };

    const onSubmitHandler = (event) => {
        event.preventDefault();
        props.onFormSubmit(
            {
                date:currentDate,
                ...Object.keys(formState).reduce((aggr, cur) => {
                    aggr[cur] = formState[cur].value;
                    return aggr;
                }, {}),

            }
        );
    };

    const onCancelHandler = () => {
        dispatchFn({ type: "RESET" });
        props.onCancel();
    };

    return (
        <form className={styles.form} onSubmit={onSubmitHandler}>
            <p className={styles.warning}>
                {" "}
                you spent {totalCalories} calories{" "}
            </p>
            <label htmlFor="date">Date: </label>
            <input
                className={`${styles["form-input"]} ${
                    !isValidDate ? styles.error : ""
                }`}
                type="date"
                value={currentDateStr}
                id="date"
                onChange={onDateChangeHandler}
            />
            <label htmlFor="meal">Meal: </label>
            <select
                className={styles["form-input"]}
                id="meal"
                onChange={onMealChangeHandler}
                value={formState.meal.value}
            >
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Snack">Snack</option>
            </select>
            <label htmlFor="content">Content: </label>
            <input
                className={`${styles["form-input"]} ${
                    !isContentValid ? styles.error : ""
                }`}
                type="text"
                id="content"
                value={formState.content.value}
                onChange={onContentChangeHandler}
            />
            <label htmlFor="calories">Calories: </label>
            <input
                type="number"
                id="calories"
                value={formState.calories.value}
                onChange={onCaloriesChangeHandler}
                className={`${styles["form-input"]} ${
                    !isCaloriesValid ? styles.error : ""
                }`}
            />
            <div className={styles.footer}>
                <button disabled={!isFormValid}>Add Record</button>
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
