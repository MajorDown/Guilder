import { NextResponse } from "next/server";
import { tokenChecker } from "@/tools/api/tokenManager";
import AdminModel from "@/tools/api/models/model.admin";
import MemberModel from "./models/model.member";
import GuildConfigModel from "./models/model.guildConfig";
import { UserStatus } from "@/types";

type AuthentifierProps = {
    model: UserStatus,
    userMail: string,
    token: string,
    guildToCheck?: string
}

const authentifier = async (props: AuthentifierProps) => {
    // SI LE USERSTATUS EST ADMIN
    if (props.model === 'admin') {
        // SI LE MAIL N'EXISTE PAS DANS LA DB
        const adminToCheck = await AdminModel.findOne({mail: props.userMail})
        if (!adminToCheck) {
            console.log(`api/authentifier ~> aucun admin n'existe avec l'adresse email ${props.userMail}`);
            return NextResponse.json("Non autorisé", { status: 401 });      
        }
        // VERIFICATION DU TOKEN
        const isAuthentified = props.token ? await tokenChecker("admin", props.token, adminToCheck.mail) : false;
        if (!isAuthentified) {
            console.log(`api/authentifier ~> ${adminToCheck.name} a échoué son authentification`);
            return NextResponse.json("Non autorisé", { status: 401 });
        }
        // SI PROPS.GUILDTOCHECK EST RENSEIGNE
        if (props.guildToCheck && adminToCheck.guild !== "") {
            const searchedGuild = await GuildConfigModel.findOne({name: props.guildToCheck});
            if (!searchedGuild) {
                console.log(`api/authentifier ~> la guilde ${props.guildToCheck} n'existe pas dans la db`);
                return NextResponse.json("Non autorisé", { status: 401 });
            }
            if (adminToCheck.guild !== props.guildToCheck) {
                console.log(`api/authentifier ~> ${adminToCheck.name} n'est pas admin de la guilde ${props.guildToCheck}`);
                return NextResponse.json("Non autorisé", { status: 401 });
            }
        }
    }
    else if (props.model === 'member') {
        // SI LE MAIL N'EXISTE PAS DANS LA DB
        const memberToCheck = await MemberModel.findOne({mail: props.userMail})
        if (!memberToCheck) {
            console.log(`api/authentifier ~> aucun membre n'existe avec l'adresse email ${props.userMail}`);
            return NextResponse.json("Non autorisé", { status: 401 });      
        }
        // VERIFICATION DU TOKEN
        const isAuthentified = props.token ? await tokenChecker("member", props.token, memberToCheck.mail) : false;
        if (!isAuthentified) {
            console.log(`api/authentifier ~> ${memberToCheck.name} a échoué son authentification`);
            return NextResponse.json("Non autorisé", { status: 401 });
        }
        // SI PROPS.GUILDTOCHECK EST RENSEIGNE
        if (props.guildToCheck && memberToCheck.guild !== "") {
            const searchedGuild = await GuildConfigModel.findOne({name: props.guildToCheck});
            if (!searchedGuild) {
                console.log(`api/authentifier ~> la guilde ${props.guildToCheck} n'existe pas dans la db`);
                return NextResponse.json("Non autorisé", { status: 401 });
            }
            if (memberToCheck.guild !== props.guildToCheck) {
                console.log(`api/authentifier ~> ${memberToCheck.name} n'est pas membre de la guilde ${props.guildToCheck}`);
                return NextResponse.json("Non autorisé", { status: 401 });
            }
        }
    }
}

export default authentifier;