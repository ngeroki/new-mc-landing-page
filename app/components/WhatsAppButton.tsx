'use client';

import { useTranslations } from 'next-intl';

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
  className?: string;
  variant?: 'primary' | 'secondary';
}

export default function WhatsAppButton({ 
  phoneNumber = '6281234567890', 
  message = 'Halo, saya tertarik dengan produk New MC',
  className = '',
  variant = 'primary'
}: WhatsAppButtonProps) {
  const t = useTranslations('hero');
  
  const handleClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const baseClasses = 'inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-md transition-all duration-300 transform hover:scale-105';
  const variantClasses = variant === 'primary' 
    ? 'bg-warm-sand text-deep-brown hover:bg-[#B8965A] shadow-lg hover:shadow-xl' 
    : 'bg-deep-brown text-white hover:bg-[#3A2819] shadow-lg hover:shadow-xl';

  return (
    <button
      onClick={handleClick}
      className={`${baseClasses} ${variantClasses} ${className}`}
    >
      {t('whatsapp')}
    </button>
  );
}

