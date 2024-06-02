const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'adiraycustomer@gmail.com', // Your email address
        pass: 'ubozjfshppvisgzg', // Your email password

    }
});


const joinUs = async (req, res) => {
    try {
        const { name, productName, productCategory, productQuantity, contact, message } = req.body;

        // Setup email data
        const mailOptions = {
            from: contact,
            to: 'anshyuve@gmail.com', // The recipient's email address
            subject: `${name} wants to join Adiray`,
            text: `Product Name: ${productName}\nProduct Category: ${productCategory}\nProduct Quantity: ${productQuantity}\n \n${message}\n\nName: ${name}\nContact: ${contact}`
        };

        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({ error });
            }
            res.status(200).json({ message: 'Email sent successfully', success: true });
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error });
    }
}

const enquiry = async (req, res) => {
    try {
        const { name, contact, country, productCategory, productName, productQuantity, message } = req.body;
        const mailOptions = {
            from: contact,
            to: 'anshyuve@gmail.com', // The recipient's email address
            subject: `${name} wants to enquire about ${productName}`,
            text: `Name: ${name}\nContact: ${contact}\nCountry: ${country}\nProduct Category: ${productCategory}\nProduct Name: ${productName}\nProduct Quantity: ${productQuantity}\nAdditional Comments: ${message}`
        };

        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({ error, success:false });
            }
            res.status(200).json({ message: 'Email sent successfully', success: true });
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error, success:false });
    }
}

const contactUs = async (req, res) => {
    try {
        const {name, contact, message} = req.body;
        const mailOptions = {
            from: contact,
            to: 'anshyuve@gmail.com', // The recipient's email address
            subject: `${name} wants to contact Adiray`,
            text: `Name: ${name}\nContact: ${contact}\nMessage: ${message}`
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({ error, success:false });
            }
            res.status(200).json({ message: 'Email sent successfully', success: true });
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error, success:false });
    }
}

module.exports = { joinUs, enquiry,contactUs };
