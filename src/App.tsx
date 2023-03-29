import { useState } from "react";

import "./App.scss";
import UserProfileArea from "./components/UserProfileArea";
import MainArea from "./components/MainArea";
import InputModal from "./components/UI/InputModal";
export type notification = {
	id: string;
	message: string;
	name: string;
	imageUrl: string;
	date: Date;
};
function App() {
	const [showTask, setShowTask] = useState(false);
	const onAddTask = () => {
		setShowTask((prev) => !prev);
	};
	return (
		<div className="container">
			{showTask ? <InputModal onAddTask={onAddTask} /> : ""}
			<UserProfileArea />
			<MainArea onAddTask={onAddTask} />
		</div>
	);
}

export default App;
