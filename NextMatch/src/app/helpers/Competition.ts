import Team from "./Team";

export default interface Competition {
	id: number,
	country: string,
	league_name: string,
	teams: Array<Team>
}