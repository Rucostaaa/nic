import twilio from 'twilio';
import dotenv from 'dotenv';
dotenv.config();

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

export const sendContactMessage = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Basic sanitization
    const cleanName = name.replace(/<[^>]*>?/gm, '');
    const cleanMessage = message.replace(/<[^>]*>?/gm, '');

    const body = `New contact form submission:\nName: ${cleanName}\nEmail: ${email}\nPhone: ${phone}\nSubject: ${subject}\nMessage: ${cleanMessage}`;

    await client.messages.create({
      body,
      from: process.env.TWILIO_PHONE, // Twilio number
      to: process.env.OWNER_PHONE,    // Owner's phone
    });

    res.status(200).json({ message: 'Message sent successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to send message', error: err.message });
  }
};