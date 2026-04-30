import { useContext, useEffect, useRef } from "react";
import RecordList from "./RecordList";
import styles from "./ListingSection.module.css";
import {AppContext} from "../../AppContext";

function ListingSection(props) {
    const { allRecords } = props;
    const { currentDate, currentDateStr, setCurrentDate } = useContext(AppContext);
    // const [filteredRecord, setFilteredRecord] = useState([]);
    const dateChangeHandler = (event) => {
        setCurrentDate(event.target.value);
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
                value={currentDateStr}
                onChange={dateChangeHandler}
            />
            <RecordList records={allRecords.filter(dateFilter)} />
            
        </>
    );
}

export default ListingSection;
