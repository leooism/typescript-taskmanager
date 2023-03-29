import { createPortal } from "react-dom";
import Card from "./Card";
import "./CalendarInput.scss";
import { ChangeEvent, MouseEvent, useState } from "react";
import parseDate from "../../util/DateObject";
import { todo } from "../Calender";
type propsType = {
	onAddTask?: Function;
	selectedDate?: Date;
	onAddTodos?: Function;
};
const Backdrop = ({ onAddTask }: propsType) => (
	<div
		className="backdrop"
		onClick={() => {
			if (onAddTask) onAddTask();
		}}
	></div>
);
const ModalOverlay = ({ selectedDate, onAddTodos, onAddTask }: propsType) => {
	const [todo, setTodo] = useState<string[]>([]);
	const [type, setType] = useState("");
	const [todoInput, setTodoInput] = useState("");
	const [color, setColor] = useState("");
	const handleInputChange = (e: ChangeEvent) => {
		const target = e.target as HTMLInputElement;
		setTodoInput(target.value);
	};
	const colorChangeHandler = (e: ChangeEvent) => {
		const target = e.target as HTMLInputElement;
		setColor(target.value);
	};
	const handleAddMore = (e: MouseEvent) => {
		e.preventDefault();
		if (todoInput == "") {
			return;
		}
		setTodo((prev) => [...prev, todoInput]);
		setTodoInput("");
	};
	const addTaskHandler = (e: MouseEvent) => {
		e.preventDefault();
		if (onAddTodos && selectedDate && onAddTask) {
			const { dayName, dayNumber, month, year } = parseDate(
				selectedDate.toString()
			);
			const data: todo = {
				createdAt: { dayName, dayNumber, month, year },
				todo: {
					id: selectedDate.toString(),
					type,
					detail: [...todo],
					color,
				},
			};
			onAddTodos(data);
			onAddTask();
		}
		return;
	};
	const handleTypeChange = (e: ChangeEvent) => {
		const target = e.target as HTMLSelectElement;
		setType(target.value);
	};

	return (
		<Card style="modal">
			<form action="" className="addTodo">
				<header className="todo-header">Task</header>
				<div className="input-todo">
					<input
						type="text"
						placeholder="Add To do"
						value={todoInput}
						onChange={handleInputChange}
					/>
					<button onClick={handleAddMore}>➕</button>
				</div>
				<div className="Todos">
					<h1 className="task">Tasks</h1>
					{todo.map((todo) => {
						return <li>{todo}</li>;
					})}
				</div>
				<div className="TodoActions">
					<div className="todo-type">
						<label htmlFor="deadline">Type </label>
						<select
							value={type}
							defaultValue={"marketing"}
							onChange={handleTypeChange}
						>
							<option value={"marketing"}>Marketing</option>
							<option value="finance"> Finance</option>
							<option value="design">Design</option>
							<option value="product">Product </option>
						</select>
					</div>
					<div className="color-menu">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 464.7 464.7">
							<path d="M446.6 18.1a62 62 0 00-87.6 0L342.3 35a23 23 0 10-32.5 32.5l5.4 5.4-180.6 180.6L71.9 316c-5 5-8 11.6-8.2 18.7l-.2 3.3-2.5 56.7a9.4 9.4 0 009.4 9.8h.4l30-1.3 18.4-.8 8.3-.4a37 37 0 0024.5-10.8l240.9-240.9 4.5 4.6a23 23 0 0032.5 0c9-9 9-23.6 0-32.6l16.7-16.7a62 62 0 000-87.6zm-174 209.2l-84.6 16 138-138 34.4 34.3-87.8 87.7zM64.5 423.9C28.9 423.9 0 433 0 444.3c0 11.3 28.9 20.4 64.5 20.4s64.5-9.1 64.5-20.4C129 433 100 424 64.5 424z" />
						</svg>
						<input
							type="color"
							value="#4d76fd"
							className="colorpicker"
							id="colorpicker"
							onChange={colorChangeHandler}
						></input>
					</div>
				</div>
				<footer className="actions">
					<button className="add-button" onClick={addTaskHandler}>
						Add
					</button>
				</footer>
			</form>
		</Card>
	);
};

const CalendarInput = ({ onAddTask, selectedDate, onAddTodos }: propsType) => {
	return (
		<>
			{createPortal(
				<Backdrop onAddTask={onAddTask} />,
				document.getElementById("backdropCalendar-root")! as HTMLDivElement
			)}
			{createPortal(
				<ModalOverlay
					selectedDate={selectedDate}
					onAddTodos={onAddTodos}
					onAddTask={onAddTask}
				/>,
				document.getElementById("overlayCalendar-root")! as HTMLDivElement
			)}
		</>
	);
};
export default CalendarInput;
