<h3>Quick Start</h3>

- Install dependencies in client and server directories.
- Run the server in development mode: `cd server && npm run start:dev`
- Run the client( React ): `cd client && npm run start`
- Run all client unit-tests: `cd client && npm run test`.

<h3>Addition script commands</h3>

- Run a single unit-test: `npm test -- --testFile="name of test file" (i.e. --testFile=Users)`.
- Check for linting errors: `npm run lint`.
- Build the project for production: `npm run build`.
- Run the production build: `npm start`.
- Run production build with a different env file `npm start -- --env="name of env file"` (default is production).

<h3>Rundown</h3>

<p>Application was designed as a sort of admin dashboard, designed to consume the given api effectively. Post requests are being faked on the client given the api doesn't offer data persistence. The client is utilizing Typescript, bootstrap, and a bootstarp table library. The api is consumed from <b>client/src/services/api-service.ts</b>. I added a few tests for each component using react testing library. The Express server is utilizing Typescript and a DAO (Data Access Object) model. I'd never used that before so figured I'd play around with it.
