export interface AuthUser {
  token: string;
  userName: string;
  emailAddress: string;
  domainAllowed: string;
  isUser?: number;
}
