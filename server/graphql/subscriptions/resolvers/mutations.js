import { models } from "../../../models";
import { sendEmail } from "./sendEmail";

const updateProcessedEmailsFlag =  (sent, Subscriptions) => {
  if (sent.length) {
    Subscriptions.update(
      { userSubscription: "sent" },
      {
        where: {
          email: {
            [models.op.in]: sent,
          },
        },
      }
    );
  }
};

const subscribe = async (obj, { email }) => {
  const queries = {
    where: { email }
  }
  const { Subscriptions } = models;
  try {
    const existingSubscription = await Subscriptions.findOne(queries);
    if (existingSubscription) {
      return {
        success: false,
        subscription: existingSubscription,
        error: {
          message: `The email '${email}' is already subscribed.`,
        },
      };
    }
    const newSubscription = Subscriptions.create({
      email,
      userSubscription: "unsent",
    });
    return {
      success: true,
      subscription: newSubscription,
    };
  } catch (error) {
    return {
      success: false,
      error: {
        message: error
      }
    };
  }
}

const sendSubscriptionEmails = async () => {
  const queries = {
    where: { userSubscription: "unsent" }
  }
  const mailSent = [];
  let mailFailed = 0;
  const { Subscriptions } = models;
  const subscriptions = await Subscriptions.findAll(queries);
  if (subscriptions && subscriptions.length) {
    try {
      const allSubscriptionPromise = subscriptions.map((subscription) => sendEmail(subscription.email));
      const data = await Promise.all(allSubscriptionPromise);

      data.map((res) => {
        if (res.accepted.length) {
          mailSent.push(res.accepted[0]);
        }
        if (res.rejected.length) {
          mailFailed++;
        }
      });
      await updateProcessedEmailsFlag(mailSent, Subscriptions);
      return {
        success: true,
        sent: mailSent.length,
        failed: mailFailed,
      };
    } catch (error) {
      return {
        success: false,
        sent: 0,
        failed: 0,
        error: { message: error },
      };
    }
  } else {
    return {
      success: true,
      sent: 0,
      failed: 0,
    };
  }
}

export default {
  subscribe,
  sendSubscriptionEmails
};
