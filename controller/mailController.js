const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_HOST, // Mailtrap SMTP host
    port: process.env.MAILTRAP_PORT, // Mailtrap SMTP port
    auth: {
        user: process.env.MAILTRAP_USER, // Mailtrap SMTP user
        pass: process.env.MAILTRAP_PASS  // Mailtrap SMTP password
    }
});
// Function to send email with credentials
exports.sendCredentialsByEmail=async(email, password)=> {
    const mailOptions = {
        from: 'no-reply@salon.com',
        to: email,
        subject: 'Your Salon Account Credentials',
        text: `Welcome! Here are your login credentials:\nEmail: ${email}\nPassword: ${password}\nPlease log in and change your password.`
    };

    await transporter.sendMail(mailOptions);
}

exports.sendEmailForAppointment = async (email, appointmentDetails) => {
    const { date, startTime, endTime, serviceName, employeeName } = appointmentDetails;

    const mailOptions = {
        from: 'no-reply@salon.com',
        to: email,
        subject: 'Salon Appointment Scheduled for you!',
        text: `
            Hello!

            Thank you for booking an appointment with us. Here are your appointment details:

            Service: ${serviceName}
            Date: ${new Date(date).toLocaleDateString()}
            Time: ${startTime} - ${endTime}
            Stylist: ${employeeName}

            We look forward to seeing you!

            Best regards,
            The Salon Team
        `
    };

    await transporter.sendMail(mailOptions);
};

// Function to send payment email
exports.sendPaymentEmail = async (userId, paymentLink)=>{
    const user = await User.findByPk(userId);
    const mailOptions = {
        from: 'no-reply@salon.com',
        to: user.email,
        subject: 'Payment Required for Your Appointment',
        text: `Please complete your payment within 10 minutes to confirm your appointment: ${paymentLink}`
    };

    await transporter.sendMail(mailOptions);
}

exports.sendCancellationEmail = async (email, appointmentDetails) => {
    const { appointmentId, date, startTime, endTime, serviceName, employeeName } = appointmentDetails;

    const mailOptions = {
        from: 'no-reply@salon.com',
        to: email,
        subject: 'Your Appointment has been Cancelled',
        text: `Dear Customer,\n\n` +
            `We regret to inform you that your appointment with ID ${appointmentId} has been cancelled.\n\n` +
            `Here are the details of your appointment:\n` +
            `- Date: ${date}\n` +
            `- Start Time: ${startTime}\n` +
            `- End Time: ${endTime}\n` +
            `- Service: ${serviceName}\n` +
            `- Employee: ${employeeName}\n\n` +
            `If you have any questions or would like to reschedule, please contact us.\n\n` +
            `Thank you for your understanding!\n` +
            `Best Regards,\n` +
            `Your Salon Team`
    };

    await transporter.sendMail(mailOptions);
};
