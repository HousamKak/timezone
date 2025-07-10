export function cn(...inputs: (string | undefined | boolean)[]): string {
  return inputs.filter((input) => typeof input === 'string' && input).join(' ');
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}

export function formatPercentage(value: number): string {
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date));
}

export function getPnLColor(value: number | null): string {
  if (value === null) return 'text-gray-500';
  return value >= 0 ? 'text-green-600' : 'text-red-600';
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'Accepted':
      return 'text-green-600 bg-green-100';
    case 'Rejected':
      return 'text-red-600 bg-red-100';
    case 'Pending':
      return 'text-yellow-600 bg-yellow-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
}

export function getConvictionColor(conviction: string): string {
  switch (conviction) {
    case 'High':
      return 'text-green-700 bg-green-100 border-green-200';
    case 'Medium':
      return 'text-yellow-700 bg-yellow-100 border-yellow-200';
    case 'Low':
      return 'text-red-700 bg-red-100 border-red-200';
    default:
      return 'text-gray-700 bg-gray-100 border-gray-200';
  }
}
