import "./Calender.scss";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

type project = {
	id: string;
	type: string;
	detail: string[];
	color: string;
};

type fullDateType = {
	dayName: string;
	dayNumber: number;
};
export type todo = {
	createdAt: fullDateType & yearAndMonthType;
	todo: project;
};

import { LocalizationProvider } from "@mui/x-date-pickers";
import CalendarMonth from "./CalendarMonth";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { useEffect, useState, useRef } from "react";
import { dateFormater } from "../util/DateFormator";
import { yearAndMonthType } from "../store";

export type datePickerType = {
	$D: number;
	$H: number;
	$L: string;
	$W: number;
	$d: Date;
	$m: number;
	$ms: number;
	$s: number;
	$u: undefined;
	$y: number;
} | null;
const Calender = ({
	onShowCalendarForm,
	todos,
	setTodos,
}: {
	onShowCalendarForm: Function;
	todos: todo;
	setTodos: Function;
}) => {
	const calenderRef = useRef<HTMLElement>();
	const [fullScreen, setFullScreen] = useState(false);
	const [pickDate, setPickDate] = useState<Date>(new Date());
	useEffect(() => {
		if (!document.fullscreenElement && fullScreen) {
			calenderRef.current?.requestFullscreen().catch((err) => {});
		} else if (document.fullscreenElement) {
			document.exitFullscreen();
		} else {
		}
		return () => {
			// setFullScreen(false);
		};
	}, [fullScreen]);

	useEffect(() => {}, [todos]);
	const onFullScreen = () => {
		setFullScreen((prev) => !prev);
	};

	return (
		<>
			<div id="overlayCalendar-root"></div>
			<div id="backdropCalendar-root"></div>
			<div className="calendar-container" ref={calenderRef}>
				<div className="calender-tab anim-y">
					<div className="week-month">
						<button className=" button active">Week</button>
						<button className=" button button-month">Month</button>
					</div>

					<div className="month-change">
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<DatePicker
								onChange={(date: any) => {
									if (date) {
										setPickDate(date.$d);
									}
								}}
							/>
						</LocalizationProvider>
					</div>

					<div className="week-month">
						<button className=" button button-weekends">Weekends</button>
						<button className=" button button-task active">Add task</button>
					</div>
					<div
						className={`notify ${fullScreen ? "full-screen" : ""}`}
						onClick={onFullScreen}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							fill="currentColor"
							className="bi bi-fullscreen"
							viewBox="0 0 16 16"
						>
							<path d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1h-4zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zM.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5z" />
						</svg>
					</div>
				</div>
				<div className="calendar-wrapper anim-y">
					<div className="month-change">
						{dateFormater(pickDate, { month: "long" })}
					</div>
					<CalendarMonth
						pickDate={pickDate}
						onShowCalendarForm={onShowCalendarForm}
						todos={todos}
						setTodos={setTodos}
					/>
				</div>
			</div>
		</>
	);
};

export default Calender;
