
export default interface Team {
	id: number,
	name: string,
	short_name: string,	
	tla?: string,
	founded?: number,
	last_updated?: string,	
	venue?: string,
	website?: string
	address?: string
	area?: Object,
	club_colors?: string,
	crest_url?: string,
	email?: string,
	phone?: string,
}