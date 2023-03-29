interface MonthBoundary {
	firstDay: Date;
	lastDay: Date;
	year: number;
	month: number;
}

export function getMonthBoundary(date: Date): MonthBoundary {
	const year = date.getFullYear();
	const month = date.getMonth();

	const firstDay = new Date(year, month, 1);
	const lastDay = new Date(year, month + 1, 0);

	return { firstDay, lastDay, year, month };
}
