/** Check if variable name only contains numbers, letters, and underscores */
export function isValidVariableName(name: string): boolean {
	//Regex for Valid Characters i.e. Alphabets, Numbers and Underscore.
	const regex = /^[A-Za-z0-9_]+$/;
	//Validate TextBox value against the Regex.
	return regex.test(name);
}
