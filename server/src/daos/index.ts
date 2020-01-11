// const usingMockDb = (process.env.USE_MOCK_DB || "").toLowerCase();
// let userDaoPath = "./User/UserDao";

// if (usingMockDb === "true") {
//   userDaoPath += ".mock";
// }

// // tslint:disable:no-var-requires
// export const { UserDao } = require(userDaoPath);
export * from "./User/UserDao";
export * from "./Post/PostDao";
