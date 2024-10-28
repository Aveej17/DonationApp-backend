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
        from: 'no-reply@donationapp.com',
        to: email,
        subject: 'Your Donation app Account Credentials',
        text: `Welcome! Here are your login credentials:\nEmail: ${email}\nPassword: ${password}\nPlease log in and change your password.`
    };

    await transporter.sendMail(mailOptions);
}

exports.sendCharityApprovalMail=async (email) =>{
    const mailOptions = {
        from : 'no-reply@donationapp.com',
        to : email,
        subject: 'Your Donation account Charity Creation is Approved',
        text: `
        Dear Charity Team,

        Congratulations! We are excited to inform you that your charity registration has been approved. 

        Your commitment to making a positive impact in the community is commendable, and we are thrilled to have you on board with us. 

        You can now start creating projects, accepting donations, and sharing your mission with the world. 

        If you have any questions or need assistance, feel free to reach out to us at support@donationapp.com.

        Thank you for your dedication to making a difference!

        Best regards,
        The Donation App Team
    `,
    }
    await transporter.sendMail(mailOptions);
}

exports.sendCharityRejectionMail=async (email) =>{
    const mailOptions = {
        from : 'no-reply@donationapp.com',
        to : email,
        subject: 'Your Donation account Charity Creation is Approved',
        text: `
            Dear Charity Team,

            We regret to inform you that your application for charity registration has not been approved at this time. 

            We understand that this may be disappointing news. Please know that your application was carefully reviewed, and the decision was made based on our current criteria and guidelines.

            If you would like to understand the reasons for the rejection or if you have any questions, please feel free to reach out to us at support@donationapp.com. We value your interest in our platform and would be happy to assist you in the future.

            Thank you for your understanding, and we wish you all the best in your charitable endeavors.

            Best regards,
            The Donation App Team
        `,
    }
    await transporter.sendMail(mailOptions);
}


exports.sendEmailForDonation = async (email, details) => {
    // Customize the subject and text based on the donation details
    const mailOptions = {
        from: 'no-reply@DonationApp.com',
        to: email,
        subject: 'Thank You for Your Donation!',
        text: `
            Dear Donor,

            Thank you for your generous donation!

            Donation Details:
            - Amount: ₹${(details.amount).toFixed(2)} INR
            - Charity ID: ${details.charityName}
            - User ID: ${details.userName}
            - Donation Date: ${new Date().toLocaleDateString()}

            Your support makes a difference!

            Best regards,
            DonationApp Team
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};
