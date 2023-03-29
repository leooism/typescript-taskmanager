import { useState } from "react";
import "./MainArea.scss";
import Header from "./Header";
import MainInbox from "./MainInbox";
import Mail from "./Mail";
import Calender, { todo } from "./Calender";
import CalendarInput from "./UI/CalendarInput";
import { calendarTaskActions, useAppDispatch } from "../store";
const MainArea = ({ onAddTask }: { onAddTask: Function }) => {
	const [showCalender, setShowCalender] = useState(false);
	const [showCalendarFrom, setShowCalendarForm] = useState(false);
	const [selectedDate, setSelectedDate] = useState<Date>(new Date());
	const [todos, setTodos] = useState<todo[]>([]);
	const onShowCalender = () => setShowCalender((prev) => !prev);
	const useDispatch = useAppDispatch();
	const onShowCalendarForm = (date: any) => {
		setSelectedDate(date);
		setShowCalendarForm((prev) => !prev);
	};
	const onAddTodos = function (data: todo) {
		const isAlreadyBooked = todos.some((todo) => todo.todo.id === data.todo.id);
		if (!isAlreadyBooked) setTodos((prev) => [...prev, data]);
		useDispatch(calendarTaskActions.addCalendarTask(data));
		return;
	};
	return (
		<div className="main-area">
			<Header onShowCalender={onShowCalender} />
			{showCalendarFrom && showCalender ? (
				<CalendarInput
					onAddTask={onShowCalendarForm}
					selectedDate={selectedDate}
					onAddTodos={onAddTodos}
				/>
			) : (
				""
			)}
			{!showCalender ? (
				<div className="main-container">
					<MainInbox onAddTask={onAddTask} />
					<Mail />
				</div>
			) : (
				<Calender
					onShowCalendarForm={onShowCalendarForm}
					todos={todos}
					setTodos={setTodos}
				/>
			)}
		</div>
	);
};

export default MainArea;
