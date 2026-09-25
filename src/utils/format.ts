export function formatAED(amount: number): string {
  return `AED ${new Intl.NumberFormat("en-US").format(amount)}`;
}

export function formatMileage(km: number, unitLabel: string): string {
  return `${new Intl.NumberFormat("en-US").format(km)} ${unitLabel}`;
}

export function cx(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
