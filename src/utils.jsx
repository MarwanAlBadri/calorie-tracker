export function getDateFromString(dateString) {
	const tokens = dateString.split("-");
	return new Date(Number(tokens[0]), Number(tokens[1]) - 1, Number(tokens[2]));
}

/* 
  will use this function istead of Date.toISOString() because toISOString() always use UTC timezone,
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString
*/
export function getDateStringNoTimezone(date) {
	return `${date.getFullYear()}-${(date.getMonth() + 1)
		.toString()
		.padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
}
