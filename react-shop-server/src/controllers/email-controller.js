const fs = require('fs');
const nodemailer = require('nodemailer');

const emailTemplate = fs.readFileSync('../src/email-templates/checkout-template.html', 'utf8');

const emailControllerPost = async (req, res) => {
    const dataToSend = req.body;

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

    const customizedTemplate = emailTemplate
        .replace('{{ recipientName }}', dataToSend.username)
        .replace('{{ cartRows }}', cartRows);

    // Create a transporter object using SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'bojan@forwardslashny.com', // Your Gmail address
            pass: 'tdzv prcx dsuz thgv' // Your Gmail password
        }
    });

    // Setup email data
    let mailOptions = {
        from: 'bojan@forwardslashny.com', // Sender address
        to: dataToSend.emailAddress, // Recipient address obtained from form submission
        subject: 'Shop Checkout',
        html: customizedTemplate
    };

    // Send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error occurred:', error);
            res.status(500).send('Error occurred while sending email');
        } else {
            console.log('Message sent:', info.messageId);
            res.send('Email sent successfully');
        }
    });
}

module.exports = {
    emailController: {
        emailControllerPost
    }
}