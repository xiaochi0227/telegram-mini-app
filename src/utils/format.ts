export function formattedPhone(phone: string) {
  if (!phone || phone == 0) return '';

  const rawPhone = phone.replace(/\s/g, '');
  const formattedPhone = rawPhone.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4');

  return formattedPhone;
}
