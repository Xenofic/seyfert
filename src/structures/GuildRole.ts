import type { APIRole, RESTPatchAPIGuildRolePositionsJSONBody } from 'discord-api-types/v10';
import type { UsingClient } from '../commands';
import { Formatter, type ImageOptions, type MethodContext, type ObjectToLower } from '../common';
import { DiscordBase } from './extra/DiscordBase';
import { PermissionsBitField } from './extra/Permissions';
import type { RESTPatchAPIGuildRoleJSONBody, RESTPostAPIGuildRoleJSONBody } from '../types';

export interface GuildRole extends DiscordBase, ObjectToLower<Omit<APIRole, 'permissions'>> {}

export class GuildRole extends DiscordBase {
	permissions: PermissionsBitField;
	constructor(
		client: UsingClient,
		data: APIRole,
		readonly guildId: string,
	) {
		super(client, data);
		this.permissions = new PermissionsBitField(BigInt(data.permissions));
	}

	guild(force = false) {
		if (!this.guildId) return;
		return this.client.guilds.fetch(this.guildId, force);
	}

	delete(reason?: string) {
		return this.client.roles.delete(this.guildId, this.id, reason);
	}

	toString() {
		return Formatter.roleMention(this.id);
	}

	iconURL(options?: ImageOptions) {
		if (!this.icon) return null;

		return this.rest.cdn['role-icons'](this.id).get(this.icon, options);
	}

	edit(body: RESTPatchAPIGuildRoleJSONBody, reason?: string) {
		return this.client.roles.edit(this.guildId, this.id, body, reason);
	}

	static methods(ctx: MethodContext<{ guildId: string }>) {
		return {
			create: (body: RESTPostAPIGuildRoleJSONBody) => ctx.client.roles.create(ctx.guildId, body),
			list: (force = false) => ctx.client.roles.list(ctx.guildId, force),
			edit: (roleId: string, body: RESTPatchAPIGuildRoleJSONBody, reason?: string) =>
				ctx.client.roles.edit(ctx.guildId, roleId, body, reason),
			delete: (roleId: string, reason?: string) => ctx.client.roles.delete(ctx.guildId, roleId, reason),
			editPositions: (body: RESTPatchAPIGuildRolePositionsJSONBody) =>
				ctx.client.roles.editPositions(ctx.guildId, body),
			fetch: (roleId: string, force = false) => ctx.client.roles.fetch(ctx.guildId, roleId, force),
		};
	}
}
