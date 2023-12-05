
export enum AuthProvider {
    LOCAL = 'LOCAL',
    GOOGLE = 'GOOGLE',
    GITHUB = 'GITHUB',
    FACEBOOK = 'FACEBOOK',
  }
  
  export enum Role {
    USER, EMPLOYEE, ADMIN
  }


export type User = {
    id: number;
    email: string;
    password: string | null;
    activationCode: string | null;
    passwordResetCode: string | null;
    active: boolean;
    provider: AuthProvider | null;
    roles: Role[] | null;
}