import type { Snowflake } from "../util/Snowflake.ts";
import type { Session } from "../session/Session.ts";
import type { DiscordEmoji } from "../vendor/external.ts";
import { Emoji } from "./Emoji.ts";
import { User } from "./User.ts";

export class GuildEmoji extends Emoji {
    constructor(session: Session, data: DiscordEmoji, guildId: Snowflake) {
        super(session, data);
        this.guildId = guildId;
        this.roles = data.roles;
        this.user = data.user ? new User(this.session, data.user) : undefined;
        this.managed = !!data.managed;
    }
    guildId: Snowflake;
    roles?: Snowflake[];
    user?: User;
    managed?: boolean;
}

export default GuildEmoji;