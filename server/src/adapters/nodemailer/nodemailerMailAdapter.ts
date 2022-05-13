import nodemailer from "nodemailer"
import { MailAdapter, SendMailData } from "../mailAdapter";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "7e81b4e3d52504",
        pass: "ddb8ff74aa079a"
    }
});

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({ subject, body }: SendMailData) {
        await transport.sendMail({
            from: "Equipe Feedget <oi@feedget.com>",
            to: "Victor Carlos <victor.carlos1395@gmail.com>",
            subject,
            html: body
        })
    };
}