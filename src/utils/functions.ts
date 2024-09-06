export function formatCurrency(number: number) {
	return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(number)
}

export function formatDate(date: Date) {
	return new Intl.DateTimeFormat('es-CL', {
		month: 'long',
		day: 'numeric',
		weekday: 'long'
	}).format(new Date(date))
}