import nodemailer from 'nodemailer';
import juice from 'juice';
import {htmlToText} from 'html-to-text';
import pug from 'pug';
import path from 'path';
import emailConfig from '../config/emailConfig.js';

const enviarEmail = async (opciones) => {
	const transport = nodemailer.createTransport({
		host: emailConfig.host,
		port: emailConfig.port,
		auth: {
			user: emailConfig.user,
			pass: emailConfig.pass,
		},
	});

	const generarHtml = (opciones) => {
		const html = pug.renderFile(path.resolve(`email/${opciones.archivo}.pug`), opciones);
		return juice(html);
	};

	await transport.sendMail({
		from: 'Eduardo <eduardogpc1@gmail.com>',
		to: opciones.usuario.email,
		subject: opciones.subject,
		text: htmlToText(generarHtml(opciones), {wordwrap: 130}),
		html: generarHtml(opciones),
	});
};

export default enviarEmail;
