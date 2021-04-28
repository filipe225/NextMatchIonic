
export interface User {
	creation_timestamp: string
	email: string,
	type: string,
	display_name: string,
	timezone: string,
	teams: Array<Number>,
	last_request: string
}