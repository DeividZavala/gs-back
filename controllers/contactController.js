const mail = require('../helpers/mail');

exports.sendContactMail = async (req,res) => {
    const email = 'contacto@reconocimientosgs.com';
    await mail.send({
        email,
        subject: `Nuevo mensaje de ${req.body.name} ${req.body.lastname}`,
        filename: 'contact',
        data: req.body
    });

    res.json({message:"success"})
};