
## Installation

Install the packages using yarn or npm

```bash
  npm install/yarn install
```
Create `.env` file in root directory and add the following variables in it

```bash
  MONGO_URL= Your mongodb cluster url
  JWT_SECRET= Your secret for JWT
```

## Run the project

Run the project using:

```bash
  yarn dev/npm run dev
```
Hit the enpoint `http://localhost:3000/api/auth` with `POST` request that will create an admin and nurses with following credentials

```bash
  email: admin@corsult.com
  password: corsult123

  email: nurseone@corsult.com
  password: nurseone123

  email: nursetwo@corsult.com
  password: nursetwo123
```