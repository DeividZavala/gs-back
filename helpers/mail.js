const nodemailer = require('nodemailer');
const juice = require('juice');
const htmltotext = require('html-to-text');
const hbs = require('hbs');
const fs = require('fs');
const promisify = require('es6-promisify');

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: false,
    requireTLS: true,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});

transporter.verify(function(error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log('Server is ready to take our messages');
    }
});

const generateHtml = (filename, options={}) =>{
    const html = hbs.compile(fs.readFileSync((__dirname, `./views/mail/${filename}.hbs`), 'utf8'));
    const inlined = juice(html(options));
    return inlined;
};

exports.send = async (options) => {
    const html = generateHtml(options.filename, options);
    const text = htmltotext.fromString(html);
    const mailOptions = {
        from: '"Contacto GS" <contacto@reconocimientosgs.com>',
        to: options.email,
        subject: options.subject,
        html,
        text,
    };

    //const sendMail = promisify(transporter.sendMail, transporter);
    //return sendMail(mailOptions);

    return transporter.sendMail(mailOptions);

};