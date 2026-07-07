import { start } from "repl";
import { formatDate } from "./formatdate";

export function getMonthDifference (startDate: Date, endDate : Date) {
    return (
        ((endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth())
    ))
};