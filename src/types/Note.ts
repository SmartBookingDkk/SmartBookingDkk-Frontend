import { Customer } from "./Customer";
import { Employee } from "./Employee";


export type Note = {
    id: number;
    header: string;
    text: string;
    customer: Customer;
    employeeCreator: Employee;
    employeeUpdaterId: Employee;
    createdDate: Date;
    lastModifiedDate: Date;
    version: number;
}