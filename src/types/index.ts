export type AuthenticatedUser = {
    username: string;
    email: string;
    id: number;
    token: string;
};

export type BankAccType = "credit" | "debit" | "dual";

export type TransactionType = "income" | "expense";

export type TransactionAccount = "credit" | "debit";

export type BankAccColor =
    | "red"
    | "pink"
    | "green"
    | "yellow"
    | "orange"
    | "purple"
    | "blue"
    | "cyan"
    | "brown"
    | "black"
    | "white"
    | "gray";

export type SummaryBankAccColors = {
    [key: string]: { name: BankAccColor; value: string };
};
export type SummaryBankAccount = {
    name: string;
    balance: number;
    color: BankAccColor;
};

export type Transaction = {
    accountToCharge?: TransactionAccount;
    amount: number;
    bankAccount: string;
    createdAt: string;
    id: string;
    name: string;
    type: TransactionType;
    user: string;
};
