import mongoose from "mongoose";
import GuildConfigModel from "@/tools/api/models/model.guildConfig";
import AdminModel from "@/tools/api/models/model.admin";
import passwordGenerator from "@/tools/api/passwordGenerator";
import { passwordCrypter } from "@/tools/api/passwordManager";
import sendMailToNewAdmin from "@/tools/api/nodemailer/sendMailToNewAdmin";

type NewGuildInput = {
    name: string;
    phone: string;
    mail: string;
    adress: {
        line1: string;
        line2?: string;
        code: string;
        city: string;
    };
    packageId: 0 | 1 | 2 | 3 | 4;
};

type NewAdminInput = {
    firstName: string;
    lastName: string;
    mail: string;
    phone: string;
};

type CreateNewGuildAndAdminInDbInput = {
    newGuild: NewGuildInput;
    newAdmin: NewAdminInput;
};

const createNewGuildAndAdmin = async (input: CreateNewGuildAndAdminInDbInput): Promise<boolean> => {
    const { newGuild, newAdmin } = input;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Création de la guilde
        const createdGuild = await GuildConfigModel.create([{
            name: newGuild.name,
            phone: newGuild.phone,
            mail: newGuild.mail,
            adress: {
                line1: newGuild.adress.line1,
                line2: newGuild.adress.line2,
                code: newGuild.adress.code,
                city: newGuild.adress.city,
                country: "France"
            },
            currentPackageId: newGuild.packageId,
            currentPeriod: "annual",
            currentPeriodStart: new Date().getMonth() + 1,
            config: [],
            rules: [],
        }], { session });

        const newPassword = passwordGenerator();
        const hashedPassword = await passwordCrypter(newPassword);

        await AdminModel.create([{
            name: `${newAdmin.firstName} ${newAdmin.lastName}`,
            mail: newAdmin.mail,
            phone: newAdmin.phone,
            guild: newGuild.name,
            password: hashedPassword,
        }], { session });

        // Valide la transaction
        await session.commitTransaction();
        session.endSession();

        // Envoi du mail (en dehors de la transaction)
        await sendMailToNewAdmin(
            {
                name: `${newAdmin.firstName} ${newAdmin.lastName}`,
                mail: newAdmin.mail,
                phone: newAdmin.phone,
                guild: newGuild.name,
                password: newPassword,
            },
            newPassword
        );

        return true;
    } catch (err) {
        // Annule tout si une étape échoue
        await session.abortTransaction();
        session.endSession();
        console.error("Transaction échouée :", err);
        throw new Error("Échec de la création de la guilde ou de l'administrateur.");
    }
};

export default createNewGuildAndAdmin;
