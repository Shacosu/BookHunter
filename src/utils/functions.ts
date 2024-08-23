export function formatCurrency(number: number) {
	return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(number)
}

export function formatDate(date: Date) {
	return new Intl.DateTimeFormat('es-CL', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	}).format(new Date(date))
}