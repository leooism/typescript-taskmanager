export const dateFormater = (date: Date, optn: any) => {
	const options: any = {
		day: "numeric",
		month: "long",
		year: "numeric",
	};
	if (!optn) {
		optn = options;
	}
	return new Intl.DateTimeFormat("en-UK", optn).format(date);
};
