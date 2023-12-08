import { Business } from "./Business";

export type BusinessAccountDetails = {
    id: number;
    bankName: string;
    regNo: string;
    accountNo: string;
    business: Business | null;
}