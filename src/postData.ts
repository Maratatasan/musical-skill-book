export class adData {
  constructor() {}
}

export class user {
  constructor(userData: iUserData) {}
}
export class allUserData {
  constructor() {}
}

interface iAddData {
  description: string;
  picture: any;
  authorUserName: string;
}

interface iUserData {
  userName: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  about: string;
  picture: any;
  musicGenre: string[];
}
