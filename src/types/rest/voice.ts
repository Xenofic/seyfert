import type { APIVoiceRegion } from '../payloads';

/**
 * https://discord.com/developers/docs/resources/voice#list-voice-regions
 */
export type RESTGetAPIVoiceRegionsResult = APIVoiceRegion[];

/**
 * @deprecated This was exported with the wrong name, use `RESTGetAPIVoiceRegionsResult` instead
 */
export type GetAPIVoiceRegionsResult = RESTGetAPIVoiceRegionsResult;
