import Subscriber from "../models/Subscriber.mjs";
import User from "../models/User.mjs";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "jeeaspirant246@gmail.com",
    pass: "rokoghiqgczejnvn",
  },
});

// Add new subscriber or update existing subscription
export const addSubscriber = async (req, res) => {
  const { email } = req.body;
  const { username } = req.params;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let subscriber = await Subscriber.findOne({ email });

    if (subscriber) {
      // If the user is already subscribed, prevent duplicate subscriptions
      if (subscriber.subscribedTo.includes(user._id)) {
        return res.status(400).json({ message: `Already subscribed to ${username}` });
      }

      // Add the user to the subscription list
      subscriber.subscribedTo.push(user._id);
    } else {
      // Create a new subscriber entry
      subscriber = new Subscriber({
        email,
        subscribedTo: [user._id],
      });
    }

    await subscriber.save();
    res.status(201).json({ message: `Subscribed to updates from ${username}` });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Send email notification
export const sendEmailNotification = async (userId, subject, message) => {
  try {
    const subscribers = await Subscriber.find({ subscribedTo: userId });
    const emailList = subscribers.map((sub) => sub.email);

    if (emailList.length > 0) {
      await transporter.sendMail({
        from: `"Portfolio Updates" <${process.env.EMAIL_USER}>`,
        to: emailList.join(","),
        subject,
        text: message,
      });
    }
  } catch (err) {
    console.error("Error sending email notification:", err.message);
  }
};
