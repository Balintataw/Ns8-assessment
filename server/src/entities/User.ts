export interface IUser {
  id?: number;
  name: string;
  username?: string;
  email: string;
  address?: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone?: string;
  website?: string;
  company?: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export class User implements IUser {
  public id?: number;
  public name: string;
  public email: string;

  constructor(nameOrUser: string | IUser, email?: string) {
    if (typeof nameOrUser === "string") {
      this.name = nameOrUser;
      this.email = email || "";
    } else {
      this.name = nameOrUser.name;
      this.email = nameOrUser.email;
      // todo add the rest?
    }
  }
}
