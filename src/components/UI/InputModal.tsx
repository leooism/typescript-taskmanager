import { createPortal } from "react-dom";
import Card from "./Card";
import "./InputModal.scss";
type propsType = {
	onAddTask: Function;
};
const Backdrop = ({ onAddTask }: propsType) => (
	<div
		className="backdrop"
		onClick={() => {
			onAddTask();
		}}
	></div>
);

const ModalOverlay = () => {
	return (
		<Card style="modal">
			<form action="" className="addTask">
				<header className="task-header">Add Task</header>
				<div className="input-1">
					<input type="text" placeholder="Title" />
				</div>
				<div className="input-2">
					<label htmlFor="deadline">DeadLine </label>
					<input type="date" placeholder="DeadLine" id="deadline" />
				</div>
				<div className="input-3">
					<label htmlFor="deadline">Project Type </label>
					{/* <input type="" placeholder="DeadLine" id="deadline" /> */}
					<select>
						<option>Marketing</option>
						<option>Artificial Inteligence</option>
						<option>BlockChain</option>
						<option>Cloud Computing</option>
					</select>
				</div>
				<div className="input-4">
					<label htmlFor="deadline">Yoo </label>
					{/* <input type="date" placeholder="DeadLine" id="deadline" /> */}
				</div>
				<footer className="actions">
					<button className="add-button">Add</button>
				</footer>
			</form>
		</Card>
	);
};

const InputModal = ({ onAddTask }: propsType) => {
	return (
		<>
			{createPortal(
				<Backdrop onAddTask={onAddTask} />,
				document.getElementById("backdrop-root")! as HTMLDivElement
			)}
			{createPortal(
				<ModalOverlay />,
				document.getElementById("overlay-root")! as HTMLDivElement
			)}
		</>
	);
};
export default InputModal;
