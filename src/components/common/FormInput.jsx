import styles from "./FormInput.module.css";
import { forwardRef } from "react";
const FormInput = forwardRef((props, ref) => {
    const { isValid, id, labelName, type, children, ...rest } = props;
    const inputElement =
        type === "select" ? (
            <select
                id={id}
                className={`${styles["form-input"]} ${
                    !isValid ? styles.error : ""
                }`}
                ref={ref}
                {...rest}
            >
                {children}
            </select>
        ) : (
            <input
                className={`${styles["form-input"]} ${
                    !isValid ? styles.error : ""
                }`}
                type={type}
                id={id}
                ref={ref}
                {...rest}
            />
        );
    return (
        <>
            <label htmlFor={id}>{labelName}: </label>
            {inputElement}
        </>
    );
});
export default FormInput;
