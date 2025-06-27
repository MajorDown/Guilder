import { NextResponse } from "next/server";
import sendContactMail from "@/tools/api/nodemailer/sendContactMail";
import { ContactEmailData } from "@/tools/api/nodemailer/sendContactMail";

export async function POST(req: Request) {
  try {
    const data: ContactEmailData = await req.json();

    if (!data.firstname || !data.lastname || !data.email || !data.phone || !data.message) {
      return NextResponse.json({ error: "Données incomplètes" }, { status: 400 });
    }

    const success = await sendContactMail(data);

    if (!success) {
      return NextResponse.json({ error: "Échec de l'envoi de l'email" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur API Contact:", error);
    return NextResponse.json({ error: "Erreur interne serveur" }, { status: 500 });
  }
}
