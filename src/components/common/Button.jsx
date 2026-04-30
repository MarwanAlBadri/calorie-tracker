import styles from "./Button.module.css";
import {memo} from 'react';
export default memo(function Button(props) {
    const {  variant, children, ...rest } = props;
    console.log("rendering button"+ variant);
    return <button className={styles[variant]} {...rest} >{children}</button>
});