const fs = require('fs');
const nodemailer = require('nodemailer');

const checkoutEmailTemplate = fs.readFileSync('../src/email-templates/checkout-template.html', 'utf8');
const changePasswordEmailTemplate = fs.readFileSync('../src/email-templates/change-password-template.html', 'utf8');
const removeUserEmailTemplate = fs.readFileSync('../src/email-templates/remove-user-template.html', 'utf8');

const transporterCall = (options, res) => {
    const transporter = nodemailer.createTransport({// Create a transporter object using SMTP transport
        service: 'gmail',
        auth: {
            user: '...', // Your Gmail address. Example: test@gmail.com
            pass: '...' // Your Gmail password. Exaple: password1234
        }
    });
    
    transporter.sendMail(options, (error, info) => {// Send mail with defined transport object
        if (error) {
            console.log('Error occurred:', error);
            res.status(500).send('Error occurred while sending email');
        } else {
            console.log('Message sent:', info.messageId);
            res.status(200).send('Email sent successfull');
        }
    });
}

const checkoutEmailControllerPost = async (req, res) => {
    const dataToSend = req.body;
    const username = dataToSend.username;
    const email = dataToSend.emailAddress;
    const cart = dataToSend.cart;
    const cartRows = cart.map(product => `
        <tr>
            <td><img src="${product.image}" alt="${product.image}" style="width:50px;height:50px;"></td>
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.quantity}</td>
        </tr>
    `).join('');

    const customizedTemplate = checkoutEmailTemplate
        .replace('{{ recipientName }}', username)
        .replace('{{ cartRows }}', cartRows);

    // Setup email data
    const mailOptions = {
        from: 'bojan@forwardslashny.com', // Sender address
        to: email, // Recipient address obtained from form submission
        subject: 'Shop Checkout',
        html: customizedTemplate
    };

    transporterCall(mailOptions, res);
}

const changePasswordEmailControllerPost = async (req, res) => {
    const dataToSend = req.body;
    const username = dataToSend.username;
    const password = dataToSend.password;
    const email = dataToSend.email;

    const customizedTemplate = changePasswordEmailTemplate
        .replace('{{ recipientName }}', username)
        .replace('{{ recipientPassword }}', password);

    let mailOptions = {
        from: 'bojan@forwardslashny.com', // Sender address
        to: email, // Recipient address obtained from form submission
        subject: 'Password Change',
        html: customizedTemplate
    };

    transporterCall(mailOptions, res);
}

const removeUserEmailControllerPost = async (req, res) => {
    const dataToSend = req.body;
    const username = dataToSend.username;
    const email = dataToSend.email;

    const customizedTemplate = removeUserEmailTemplate
        .replace('{{ recipientName }}', username);

    let mailOptions = {
        from: 'bojan@forwardslashny.com', // Sender address
        to: email, // Recipient address obtained from form submission
        subject: 'User Removal',
        html: customizedTemplate
    };

    transporterCall(mailOptions, res);
}

module.exports = {
    emailController: {
        checkoutEmailControllerPost,
        changePasswordEmailControllerPost,
        removeUserEmailControllerPost
    }
}