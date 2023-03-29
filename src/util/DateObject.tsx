interface DateObject {
	dayName: string;
	dayNumber: number;
	month: number;
	year: number;
}

export default function parseDate(dateString: string): DateObject {
	const date = new Date(dateString);
	const dayNames = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	const month = date.getMonth() + 1; // JavaScript months are zero-indexed, so we add 1 to get the actual month number
	const dayNumber = date.getDate();
	const dayName = dayNames[date.getDay()];

	return {
		dayName,
		dayNumber,
		month,
		year: date.getFullYear(),
	};
}
