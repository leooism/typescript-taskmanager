import React, { useEffect, useRef, useState } from "react";
import { getMonthBoundary } from "../util/GetDays";
import { todo } from "./Calender";
import store, { useAppState } from "../store";
import getCommonElements from "../util/getCommonElement";

const days = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"THursday",
	"Friday",
	"Saturday",
];
const getClassName = (type: string): string => {
	switch (type) {
		case "marketing":
			return "project-market";
			break;

		case "design":
			return "project-design";
			break;

		case "develop":
			return "project-develop";
			break;

		case "finance":
			return "project-finance";
			break;

		default:
			return "";
	}
};
const htmlTemplate = ({
	detail,
	title,
}: {
	detail: string[];
	title: string;
}) => {
	return `
	<div class="hover-title">${title.toUpperCase()}</div>
	${detail
		.map(
			(e) => `<div class="project-detail">Sales report from last month</div>`
		)
		.join("")}
	
	<div class="popup-check">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="feather feather-check-square"
		>
			<path d="M9 11l3 3L22 4" />
			<path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
		</svg>
	</div>`;
};

const CalendarMonth = ({
	pickDate,
	onShowCalendarForm,
	todos,
	setTodos,
}: {
	pickDate: Date;
	onShowCalendarForm: Function;
	todos: todo[];
	setTodos: Function;
}) => {
	const { firstDay, lastDay, year, month } = getMonthBoundary(
		new Date(pickDate)
	);
	const calanderRef = useRef<HTMLDivElement>();

	const toggleModal = (e: Event) => {
		const target = e.target as HTMLDivElement;
		if (target.dataset.id || target.parentElement?.dataset.id) {
			const id = target.dataset.id || target.parentElement?.dataset.id;
			const hasAlreadyBooked = todos.some((todo) => todo.todo.id == id);
			console.log(hasAlreadyBooked);

			if (!hasAlreadyBooked) onShowCalendarForm(id);
			return;
		}
	};
	useEffect(() => {
		if (todos.length !== 0) {
			todos.map((todo) => {
				const element = document.querySelector(
					`[data-id = "${todo.todo.id}"]`
				)! as HTMLInputElement;
				if (!element) return;
				element.className = `day ${getClassName(
					todo.todo.type.toLocaleLowerCase()
				)}`;
				element.insertAdjacentHTML(
					"beforeend",
					htmlTemplate({ title: todo.todo.type, detail: todo.todo.detail })
				);
				setTodos([]);
			});
		}
	}, [todos]);
	const getCalendarTasks = useAppState(
		(state) => state.calendarTaskStore.tasks
	);
	useEffect(() => {
		const calendarDays = Array.from(
			document.querySelectorAll(".day")
		) as HTMLDivElement[];
		// console.log(calendarDays);
		const daysWithId = calendarDays.map((day) => day.dataset.id);
		const [idFromStore] = getCalendarTasks.map((task) => {
			const a = task.todos.map((t) => t.todo.id);
			return a;
		});
		// console.log(idFromStore, daysWithId);
		console.log(getCommonElements(daysWithId, idFromStore));
	}, [getCalendarTasks]);
	const calendarTodo = useAppState((state) => state.calendarTaskStore.tasks);
	console.log(calendarTodo);
	return (
		<div className="calendar" ref={calanderRef}>
			<div className="days">Monday</div>
			<div className="days">Tuesday</div>
			<div className="days">Wednesday</div>
			<div className="days">Thursday</div>
			<div className="days">Friday</div>
			<div className="days">Saturday</div>
			<div className="days">Sunday</div>
			{/*
		       Look for day, leave blank for day that does not count, start fill from the start day

		    */}
			{days.map((_, i) => {
				if (i < new Date(firstDay).getDay() - 1) {
					return <div className="day" key={i}></div>;
				}
				const day = [];

				for (let j = 1; j <= new Date(lastDay).getDate(); j++) {
					day.push(
						<div
							className="day"
							data-id={Number(new Date(year, month, j))}
							key={i}
							onClick={toggleModal}
						>
							{j}
						</div>
					);
				}
				if (i == new Date(firstDay).getDay()) {
					return day;
				}
			})}
		</div>
	);
};

export default CalendarMonth;
``;
/* 
<div className="calendar">
					<div className="days">Monday</div>
					<div className="days">Tuesday</div>
					<div className="days">Wednesday</div>
					<div className="days">Thursday</div>
					<div className="days">Friday</div>
					<div className="days">Saturday</div>
					<div className="days">Sunday</div>
					<div className="day not-work">31</div>
					<div className="day project-market">
						1<div className="hover-title">Marketing</div>
						<div className="project-detail">Sales report from last month</div>
						<div className="project-detail">Prepare offers for clients</div>
						<div className="popup-check">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								className="feather feather-check-square"
							>
								<path d="M9 11l3 3L22 4" />
								<path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
							</svg>
						</div>
					</div>
					<div className="day">2</div>
					<div className="day project-design">
						3
						<div className="project-detail design">
							Create 3 illustrations for blog post about design trends
						</div>
					</div>
					<div className="day">4</div>
					<div className="day">5</div>
					<div className="day">6</div>
					<div className="day project-develop">
						7
						<div className="project-detail develop">
							Take part in course about future design trends and new
							technologies
						</div>
					</div>
					<div className="day">8</div>
					<div className="day">9</div>
					<div className="day">10</div>
					<div className="day">11</div>
					<div className="day">12</div>
					<div className="day">13</div>
					<div className="day">14</div>
					<div className="day project-market">
						15
						<div className="hover-title">Marketing</div>
						<div className="project-detail">
							Write an article about design trends
						</div>
						<div className="popup-check">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								className="feather feather-check-square"
							>
								<path d="M9 11l3 3L22 4" />
								<path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
							</svg>
						</div>
					</div>
					<div className="day">16</div>
					<div className="day project-market">
						17
						<div className="hover-title">Marketing</div>
						<div className="project-detail">Create AdWords campaign</div>
						<div className="project-detail">Send newsletter to clients</div>
						<div className="popup-check">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								className="feather feather-check-square"
							>
								<path d="M9 11l3 3L22 4" />
								<path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
							</svg>
						</div>
					</div>
					<div className="day">18</div>
					<div className="day">19</div>
					<div className="day">20</div>
					<div className="day">21</div>
					<div className="day">22</div>
					<div className="day project-finance">
						23
						<div className="hover-title">Management</div>
						<div className="project-detail finance">
							Redesign project ui interface for clients and get feedback
						</div>
						<div className="popup-check">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								className="feather feather-check-square"
							>
								<path d="M9 11l3 3L22 4" />
								<path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
							</svg>
						</div>
					</div>
					<div className="day">24</div>
					<div className="day">25</div>
					<div className="day">26</div>
					<div className="day">27</div>
					<div className="day">28</div>
					<div className="day">29</div>
					<div className="day">30</div>
					<div className="day not-work">1</div>
					<div className="day not-work">2</div>
					<div className="day not-work">3</div>
					<div className="day not-work">4</div>
				</div> */
