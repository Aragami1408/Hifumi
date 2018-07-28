import {GuildMember, RichEmbed} from "discord.js";
import {Infraction} from "../../database/models/infraction";
import {IInfractionHandler} from "../../interfaces/injectables/infractionHandler.interface";
import {Container} from "typescript-ioc";

export default function banByInfractionDMEmbed(member: GuildMember,lastInfraction: Infraction, previousStrikes: Infraction[]){
    const infractionHandler: IInfractionHandler = Container.get(IInfractionHandler);
    const banInfraction: string = infractionHandler.formatInfraction(lastInfraction, true);
    const infractions: string[] = previousStrikes.map(p => infractionHandler.formatInfraction(p, true));
    const embed = new RichEmbed()
        .setTitle(`Banned ⛔`)
        .setColor(`#ff0000`)
        .setDescription(
            `You were banned in **${member.guild.name}** for receiving too many strikes.\n` +
            `**The last strike that resulted in your ban:**\n\n` +
            `${banInfraction}\n**The rest of your history**`);

    for (let i in infractions){
        embed.addField(`Strike #${Number(i) + 1}`, infractions[i]);
    }
    if (!infractions.length){
        embed.addField(`No history`, `**0** previous infractions were found in your record.`);
    }
    return embed;
}
