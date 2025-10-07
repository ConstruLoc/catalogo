export function openWhatsApp(phone: string, text: string) {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Windows Phone/i.test(
    navigator.userAgent
  );
  const message = encodeURIComponent(text);
  const url = isMobile
    ? `whatsapp://send?phone=${phone}&text=${message}`
    : `https://web.whatsapp.com/send?phone=${phone}&text=${message}`;

  window.open(url, '_blank');
}
