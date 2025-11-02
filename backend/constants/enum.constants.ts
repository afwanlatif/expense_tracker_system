export enum Transaction_Type {
    income = 'INCOME',
    expense = 'EXPENSE'
};

export enum Record_Status {
    active = 'ACTIVE',
    inactive = 'INACTIVE',
}

export const transactionTypes: string[] = Object.values(Transaction_Type);
export const recordStatuses: string[] = Object.values(Record_Status)