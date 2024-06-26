import type { APIRole } from 'discord-api-types/v10';
import type { ReturnCache } from '../..';
import { fakePromise } from '../../common';
import { GuildRole } from '../../structures';
import { GuildRelatedResource } from './default/guild-related';

export class Roles extends GuildRelatedResource {
	namespace = 'role';

	//@ts-expect-error
	filter(data: APIRole, id: string, guild_id?: string) {
		return true;
	}

	override get(id: string): ReturnCache<GuildRole | undefined> {
		return fakePromise(super.get(id)).then(rawRole =>
			rawRole ? new GuildRole(this.client, rawRole, rawRole.guild_id) : undefined,
		);
	}

	override bulk(ids: string[]): ReturnCache<GuildRole[]> {
		return fakePromise(super.bulk(ids)).then(roles =>
			roles.map(rawRole => new GuildRole(this.client, rawRole, rawRole.guild_id)),
		);
	}

	override values(guild: string): ReturnCache<GuildRole[]> {
		return fakePromise(super.values(guild)).then(roles =>
			roles.map(rawRole => new GuildRole(this.client, rawRole, rawRole.guild_id)),
		);
	}
}
