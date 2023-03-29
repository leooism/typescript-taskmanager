import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit";
import { todo } from "../components/Calender";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export type yearAndMonthType = {
	month: number;
	year: number;
};

type calendarTaskType = {
	date: yearAndMonthType;
	todos: todo[];
};

type calendarTasksType = {
	tasks: calendarTaskType[];
};

const initalState: calendarTasksType = {
	tasks: [
		{
			date: {
				month: 1,
				year: 2023,
			},
			todos: [
				{
					createdAt: {
						dayName: "Sunday",
						month: 1,
						year: 2023,
						dayNumber: 1,
					},
					todo: {
						id: String(Date.now()),
						type: "marketing",
						detail: ["Hi", "is"],
						color: "red",
					},
				},
			],
		},
	],
};

const calendarTaskSlice = createSlice({
	name: "calendarSlice",
	initialState: initalState,
	reducers: {
		addCalendarTask(state, payload: PayloadAction<todo>) {
			const { month, year } = payload.payload.createdAt;
			//Match for same year and month
			//Push into task list

			//Check if year exist
			const isAlreadyExistIndex = state.tasks
				.map((ts) => ts.date.month + " " + ts.date.year)
				.indexOf(month + " " + year);
			console.log(isAlreadyExistIndex);

			if (isAlreadyExistIndex > 0) {
				console.log("Already existed");
				state.tasks[isAlreadyExistIndex].todos.push(payload.payload);
				return;
			}
			//If not then

			state.tasks.push({
				date: {
					month,
					year,
				},
				todos: [payload.payload],
			});
		},
	},
});

export const calendarTaskActions = calendarTaskSlice.actions;

const store = configureStore({
	reducer: {
		calendarTaskStore: calendarTaskSlice.reducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppState: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export default store;
