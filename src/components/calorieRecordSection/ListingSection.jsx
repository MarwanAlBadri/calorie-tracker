import { useState } from "react";
import RecordList from "./RecordList";
import styles from "./ListingSection.module.css";
import { getDateFromString, getDateStringNoTimezone } from "../../utils";

function ListingSection(props) {
    const { allRecords , currentDate ,setCurrentDate  } = props;
    // const [filteredRecord, setFilteredRecord] = useState([]);


    const dateChangeHandler = (event) => {
        setCurrentDate(getDateFromString(event.target.value));
    };

    const dateFilter = (record) =>
        record.date.getDate() === currentDate.getDate() &&
        record.date.getMonth() === currentDate.getMonth() &&
        record.date.getFullYear() === currentDate.getFullYear();


    return (
        <>
            <label
                className={styles["listing-picker-label"]}
                htmlFor="ListingDate"
            >
                Select date
            </label>
            <input
                id="ListingDate"
                type="date"
                className={styles["listing-picker-input"]}
                value={getDateStringNoTimezone(currentDate)}
                onChange={dateChangeHandler}
            />
            <RecordList records={allRecords.filter(dateFilter)} />
        </>
    );
}

export default ListingSection;
