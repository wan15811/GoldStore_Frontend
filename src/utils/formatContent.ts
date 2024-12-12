import { format } from "date-fns";

function formatDate(dateString: string, dateFormat: string): string {
  const date = new Date(dateString);
  return format(date, dateFormat);
}

function formatCurrency(amount: number, currencyFormat: string): string {
  const options: Intl.NumberFormatOptions = {
    style: "currency",
    currency: currencyFormat,
  };
  return new Intl.NumberFormat(undefined, options).format(amount);
}

function formatFloatNumber(text: string): string {
  const delimRemovedValue = text.replace(".", "");
  const progressedValue = parseFloat(
    (parseInt(delimRemovedValue) / 1000).toString(),
  ).toFixed(3);
  return progressedValue;
}

export { formatCurrency, formatDate, formatFloatNumber };
