import type {
	APIMessage,
	GatewayMessageCreateDispatchData,
	GatewayMessageDeleteBulkDispatchData,
	GatewayMessageDeleteDispatchData,
	GatewayMessagePollVoteDispatchData,
	GatewayMessageReactionAddDispatchData,
	GatewayMessageReactionRemoveAllDispatchData,
	GatewayMessageReactionRemoveDispatchData,
	GatewayMessageReactionRemoveEmojiDispatchData,
	GatewayMessageUpdateDispatchData,
} from 'discord-api-types/v10';
import { type MakeRequired, type PartialClass, toCamelCase, type ObjectToLower } from '../../common';
import { Message } from '../../structures';
import type { UsingClient } from '../../commands';

export const MESSAGE_CREATE = (self: UsingClient, data: GatewayMessageCreateDispatchData) => {
	return new Message(self, data);
};

export const MESSAGE_DELETE = async (
	self: UsingClient,
	data: GatewayMessageDeleteDispatchData,
): Promise<Message | ObjectToLower<GatewayMessageDeleteDispatchData>> => {
	return (await self.cache.messages?.get(data.id)) ?? toCamelCase(data);
};

export const MESSAGE_DELETE_BULK = async (self: UsingClient, data: GatewayMessageDeleteBulkDispatchData) => {
	return {
		...data,
		messages: await Promise.all(data.ids.map(id => self.cache.messages?.get(id))),
	};
};

export const MESSAGE_REACTION_ADD = (_self: UsingClient, data: GatewayMessageReactionAddDispatchData) => {
	return toCamelCase(data);
};

export const MESSAGE_REACTION_REMOVE = (_self: UsingClient, data: GatewayMessageReactionRemoveDispatchData) => {
	return toCamelCase(data);
};

export const MESSAGE_REACTION_REMOVE_ALL = (_self: UsingClient, data: GatewayMessageReactionRemoveAllDispatchData) => {
	return toCamelCase(data);
};

export const MESSAGE_REACTION_REMOVE_EMOJI = (
	_self: UsingClient,
	data: GatewayMessageReactionRemoveEmojiDispatchData,
) => {
	return toCamelCase(data);
};

export const MESSAGE_UPDATE = async (
	self: UsingClient,
	data: GatewayMessageUpdateDispatchData,
): Promise<
	[
		message: MakeRequired<
			PartialClass<Message>,
			| 'id'
			| 'channelId'
			| 'createdAt'
			| 'createdTimestamp'
			| 'rest'
			| 'cache'
			| 'api'
			| 'client'
			| 'mentions'
			| 'url'
			| 'user'
			| 'author'
		>,
		old: undefined | Message,
	]
> => {
	return [new Message(self, data as APIMessage), await self.cache.messages?.get(data.id)];
};

export const MESSAGE_POLL_VOTE_ADD = (_: UsingClient, data: GatewayMessagePollVoteDispatchData) => {
	return toCamelCase(data);
};

export const MESSAGE_POLL_VOTE_REMOVE = (_: UsingClient, data: GatewayMessagePollVoteDispatchData) => {
	return toCamelCase(data);
};
