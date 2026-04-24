import {useEffect, useState} from "react";
import ListingSection from "./components/calorieRecordSection/ListingSection";
import CaloriesRecordEdit from "./components/edit/CaloriesRecordEdit";
import Modal from "react-modal";
import styles from "./App.module.css";
import {getDateFromString} from "./utils";

const LOCAL_STORAGE_KEY = "calorieRecords";



function App() {
	const [records, setRecords] = useState();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [currentDate, setCurrentDate] = useState(new Date());

	function save (){
		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(records));
	}

	function loadRecords(){
		const storageRecords = localStorage.getItem(LOCAL_STORAGE_KEY);
		if(storageRecords !=null && storageRecords != "undefined"){
			setRecords(JSON.parse(storageRecords).map((record) => {
				return {
					...record,
					date: new Date(record.date),
					calories: Number(record.calories)
				};
			}));
		}else{
			setRecords([]);
		}
	}


	useEffect(() => {
		if(!records){
			loadRecords();
		}else{
			save();
		}
	}, [records]);

	const modalStyles = {
		content: {
			top: "50%",
			left: "50%",
			right: "auto",
			bottom: "auto",
			marginRight: "-50%",
			transform: "translate(-50%, -50%)",
			border: "none",
			padding: "0px",
			borderRadius: "var(--theme-border-radius-smooth)",
		},
		overlay: {
			background: "rgba(0,0,0,.5)",
		},
	};

	const handleOpenModal = () => {
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	const formSubmitHandler = (record) => {
		const formattedRecord = {
			...record,
			date: getDateFromString(record.date),
			id: crypto.randomUUID(),
		};
		setRecords([formattedRecord, ...records]);

		handleCloseModal();
	};

	return (
		<div className="App">
			<h1 className={styles.title}>Calorie Tracker</h1>
			<Modal
				isOpen={isModalOpen}
				onRequestClose={handleCloseModal}
				contentLabel="Modal"
				style={modalStyles}
			>
				<CaloriesRecordEdit
					onFormSubmit={formSubmitHandler}
					onCancel={handleCloseModal}
					currentDate={currentDate}
					setCurrentDate={setCurrentDate}
				/>
			</Modal>

			{records && <ListingSection allRecords={records} setCurrentDate={setCurrentDate} currentDate={currentDate} />}
			<button className={styles["open-modal-button"]} onClick={handleOpenModal}>
				Track food
			</button>
		</div>
	);
}

export default App;
