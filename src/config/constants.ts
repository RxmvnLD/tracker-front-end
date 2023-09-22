import { SummaryBankAccColors, BankAccountTypes } from "../types";

export const SummaryBankAccountsColors: SummaryBankAccColors = {
    red: { name: "red", value: "#ff5555", nameEsp: "Rojo" },
    pink: { name: "pink", value: "#ff78db", nameEsp: "Rosa" },
    green: { name: "green", value: "#78ff78", nameEsp: "Verde" },
    yellow: { name: "yellow", value: "#feea6a", nameEsp: "Amarillo" },
    orange: { name: "orange", value: "#ff964a", nameEsp: "Naranja" },
    purple: { name: "purple", value: "#a853fd", nameEsp: "Morado" },
    blue: { name: "blue", value: "#787fff", nameEsp: "Azul" },
    cyan: { name: "cyan", value: "#78fffb", nameEsp: "Cyan" },
    brown: { name: "brown", value: "#6f4a3c", nameEsp: "Café" },
    black: { name: "black", value: "#343434", nameEsp: "Negro" },
    white: { name: "white", value: "#ffffff", nameEsp: "Blanco" },
    gray: { name: "gray", value: "#9e9e9e", nameEsp: "Gris" },
};

export const BankAccountsType: BankAccountTypes = {
    credit: { name: "credit", value: "Crédito" },
    debit: { name: "debit", value: "Débito" },
    dual: { name: "dual", value: "Dual" },
};
