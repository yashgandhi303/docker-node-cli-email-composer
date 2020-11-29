import chalk from "chalk";
import fetch from "node-fetch";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import gql from "graphql-tag";


const SERVER_URL = process.env.SERVER_URL || "http://localhost:4000/graphql";

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: SERVER_URL,
    fetch,
  }),
});

const COMPOSE_EMAIL_SUBSCRIBERS_MUTATION = gql`
  mutation {
    sendSubscriptionEmails {
      success
      sent
      failed
      error {
        message
      }
    }
  }
`;

(async () => {
  try {
    const response = await apolloClient.mutate({
      mutation: COMPOSE_EMAIL_SUBSCRIBERS_MUTATION,
    });
    const sendSubscriptionEmails = response.data.sendSubscriptionEmails;
    if (sendSubscriptionEmails.success) {
      console.log(`Subscription completed  ${chalk.green("successfully")}`);
      console.log(":::::::::::::::::RESULT:::::::::::::::::");
      console.log(
        `Subscription emails ${chalk.green(
          "successfully"
        )} sent : ${chalk.green(sendSubscriptionEmails.sent)}`
      );
      console.log(
        `Subscription emails ${chalk.red("failed")} while sending : ${chalk.red(
          sendSubscriptionEmails.failed
        )}`
      );
    } else {
      console.log(chalk.red("Nothing to be processed."));
    }
  } catch (error) {
    console.log(`Something went wrong on Subscription emails: \n ${chalk.red(error)}`);
  }
})();