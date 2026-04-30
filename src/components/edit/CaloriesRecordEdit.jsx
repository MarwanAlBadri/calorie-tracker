import { useState, useEffect, useReducer, useContext, useRef, useCallback, useMemo } from "react";
import styles from "./CaloriesRecordEdit.module.css";
import { AppContext } from "../../AppContext";
import FormInput from "../common/FormInput";
import Button from "../common/Button";
const DEFAULT_VALUES = {
    meal: true,
    content: false,
    calories: true,
};

function formReducer(state, action) {
    const { key, value, auxValue } = action;
    let valid;
    switch (key) {
        case "content":
            valid =
                (value === "sport" && auxValue < 0) ||
                (value !== "sport" && auxValue >= 0);
            return {
                ...state,
                content: !!value,
                calories: valid,
            };
        case "calories":
            console.log(value, auxValue);
            valid =
                (auxValue === "sport" && value < 0) ||
                (auxValue !== "sport" && value >= 0);
            return {
                ...state,
                calories: valid,
            };
        default:
            return {
                ...state,
                meal: !!value,
            };
    }
}

function CaloriesRecordEdit(props) {
    const {
        currentDate,
        currentDateStr,
        isValidDate,
        setCurrentDate,
        totalCalories,
    } = useContext(AppContext);

    const [formState, dispatchFn] = useReducer(formReducer, DEFAULT_VALUES);
    const contentRef = useRef();
    const mealRef = useRef();
    const caloriesRef = useRef();

    const { content: isContentValid, calories: isCaloriesValid } = formState;
    const isFormValid = useMemo(() => {
        return isCaloriesValid && isContentValid && isValidDate;
    }, [isCaloriesValid, isContentValid, isValidDate]);

    useEffect(() => {
        if (!isContentValid) {
            contentRef.current.focus();
        }
    }, [isContentValid]);

    const onDateChangeHandler = (event) => {
        setCurrentDate(event.target.value);
    };
    const onMealBlurHandler = (event) => {
        dispatchFn({
            key: "meal",
            value: event.target.value,
        });
        console.log(formState);
    };

    const onContentBlurHandler = (event) => {
        dispatchFn({
            key: "content",
            value: event.target.value,
            auxValue: Number(caloriesRef.current.value),
        });
        console.log(formState);
    };

    const onCaloriesBlurHandler = (event) => {
        dispatchFn({
            key: "calories",
            value: Number(event.target.value),
            auxValue: contentRef.current.value,
        });
        console.log(formState);
    };

    const onSubmitHandler = (event) => {
        event.preventDefault();
        props.onFormSubmit({
            date: currentDate,
            meal: mealRef.current.value,
            content: contentRef.current.value,
            calories: Number(caloriesRef.current.value),
        });
    };

    const onCancelHandler = useCallback(() => {
        if(isFormValid){
            props.onCancel();
        }
    }, [isFormValid]);

    return (
        <form className={styles.form} onSubmit={onSubmitHandler}>
            <p className={styles.warning}>
                {" "}
                you spent {totalCalories} calories{" "}
            </p>

            <FormInput
                type="date"
                id="date"
                labelName="Date"
                isValid={isValidDate}
                onChange={onDateChangeHandler}
                value={currentDateStr}
            />
            <FormInput
                labelName="Meal"
                id="meal"
                type="select"
                onBlur={onMealBlurHandler}
                ref={mealRef}
                isValid
            >
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Snack">Snack</option>
            </FormInput>

            <FormInput
                type="text"
                id="content"
                labelName="Content"
                isValid={isContentValid}
                onBlur={onContentBlurHandler}
                ref={contentRef}
            />
            <FormInput
                type="number"
                id="calories"
                labelName="Calories"
                isValid={isCaloriesValid}
                onBlur={onCaloriesBlurHandler}
                ref={caloriesRef}
            />

            <div className={styles.footer}>
                <Button variant="primary" disabled={!isFormValid}>Add Record</Button>
                <Button
                    variant="secondary"
                    type="button"
                    onClick={onCancelHandler}
                >
                    Cancel
                </Button>
            </div>
        </form>
    );
}

export default CaloriesRecordEdit;
