# Email Composer App - Node Cli

A small email app using Docker that sends emails based on email addresses
that you enter into a subscription form. When an email address is entered, it saves the
address to the database (only once) and sets a flag as “unsent”. So, Creating a CLI (Command line program) using Node.js to process the emails in the database and send an email to the email addresses in the database that are marked as “unsent”, when the emails are successfully delivered, mark them as “sent”.

## Requirements

- **Node.js 13.x (ES6, we’re 100% an ES6 shop)** 
- **React.js**
- **GraphQL (with Express)**
- **Mailcatcher**
- **Postgres**
- **Sequelize**
- **Yarn**

### Optional Requirements

- **Docker** via ([https://www.docker.com/]())
- **Docker Compose** via ([https://docs.docker.com/compose/]())

## Proper Way To Start Everything

from the root folder run below command:
```sh
docker-compose up          
```
It will run the following: 
- **Node.js (Server)** on `localhost:4000/graphql`
- **React.js SPA (for email entry)** on `localhost:3000`
- **Mailcatcher (Mail Server)** on `localhost:1080`
- **Postgres (Database used for storing Email Address)** on `localhost:5432`

## To Run the Cli

One can run by navigating to the `composer-cli` folder and run:
```sh
yarn install && yarn start       
```