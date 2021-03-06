import {gb} from "../../../misc/Globals";
import {GuildMember, RichEmbed} from "discord.js";

export default async function logNewSuggestionEmbed(member: GuildMember){
    const prefix = await gb.database.getPrefix(member.guild.id);

    return new RichEmbed()
        .setTitle(`New Suggestion`)
        .setColor(`#f8b3ff`)
        .setDescription(`A new suggestion was submitted by ${member}\nUse **${prefix}suggestions** to view their request.`);
}
