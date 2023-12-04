
export enum AuthProvider {
    LOCAL = 'LOCAL',
    GOOGLE = 'GOOGLE',
    APPLE = "APPLE"
}
  
  export enum Role {
    USER, EMPLOYEE, ADMIN
  }


export type User = {
    id?: number;
    email: string;
    password?: string;
    activationCode?: string;
    passwordResetCode?: string;
    active: boolean;
    provider: AuthProvider;
    roles?: Role[];
}