'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useState } from 'react';
import WhatsAppButton from '@/app/components/WhatsAppButton';

export default function ContactPage() {
    const t = useTranslations('contact');
    const tFooter = useTranslations('footer');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Create WhatsApp message
        const message = `Halo, saya ${formData.name}%0A%0AEmail: ${formData.email}%0ATelepon: ${formData.phone}%0A%0APesan: ${formData.message}`;
        const whatsappUrl = `https://wa.me/6281234567890?text=${message}`;
        window.open(whatsappUrl, '_blank');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <section className="py-12 md:py-16 bg-[#FDFBF7]">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <h1 className="text-2xl md:text-5xl lg:text-6xl font-heading font-semibold text-deep-brown mb-4">
                            {t('title')}
                        </h1>
                        <p className="text-base md:text-xl text-deep-brown/70 max-w-2xl mx-auto">
                            {t('subtitle')}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Contact Content */}
            <section className="py-12 md:py-16 bg-white">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                        {/* Contact Information */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="space-y-6"
                        >
                            <div>
                                <h2 className="text-2xl md:text-3xl font-heading font-semibold text-deep-brown mb-4">
                                    {t('infoTitle')}
                                </h2>
                                <div className="w-16 h-1 bg-warm-sand mb-6"></div>
                            </div>

                            {/* Address */}
                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0 w-10 h-10 bg-warm-sand/20 rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-warm-sand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-heading font-semibold text-deep-brown mb-1">{t('addressLabel')}</h3>
                                    <p className="text-sm md:text-base text-deep-brown/70 leading-relaxed">
                                        {tFooter('address')}
                                    </p>
                                </div>
                            </div>

                            {/* WhatsApp */}
                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0 w-10 h-10 bg-warm-sand/20 rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-warm-sand" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-heading font-semibold text-deep-brown mb-1">WhatsApp</h3>
                                    <p className="text-sm md:text-base text-deep-brown/70 mb-2">
                                        {tFooter('whatsapp')}
                                    </p>
                                    <WhatsAppButton />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0 w-10 h-10 bg-warm-sand/20 rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-warm-sand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-heading font-semibold text-deep-brown mb-1">Email</h3>
                                    <a href="mailto:info@newmc.com" className="text-sm md:text-base text-deep-brown/70 hover:text-warm-sand transition-colors">
                                        {tFooter('email')}
                                    </a>
                                </div>
                            </div>

                            {/* Business Hours */}
                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0 w-10 h-10 bg-warm-sand/20 rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-warm-sand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-heading font-semibold text-deep-brown mb-1">{t('hoursLabel')}</h3>
                                    <p className="text-sm md:text-base text-deep-brown/70">
                                        {t('hoursText')}<br />
                                        {t('hoursClosed')}
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="bg-[#FEF1DE] p-6 md:p-8 rounded-lg shadow-lg"
                        >
                            <h2 className="text-xl md:text-2xl font-heading font-semibold text-deep-brown mb-6">
                                {t('formTitle')}
                            </h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm md:text-base text-deep-brown font-medium mb-2">
                                        {t('nameLabel')}
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 text-sm md:text-base rounded-md border border-deep-brown/20 focus:border-warm-sand focus:ring-2 focus:ring-warm-sand/20 outline-none transition-all"
                                        placeholder={t('namePlaceholder')}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm md:text-base text-deep-brown font-medium mb-2">
                                        {t('emailLabel')}
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 text-sm md:text-base rounded-md border border-deep-brown/20 focus:border-warm-sand focus:ring-2 focus:ring-warm-sand/20 outline-none transition-all"
                                        placeholder={t('emailPlaceholder')}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block text-sm md:text-base text-deep-brown font-medium mb-2">
                                        {t('phoneLabel')}
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        required
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 text-sm md:text-base rounded-md border border-deep-brown/20 focus:border-warm-sand focus:ring-2 focus:ring-warm-sand/20 outline-none transition-all"
                                        placeholder={t('phonePlaceholder')}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm md:text-base text-deep-brown font-medium mb-2">
                                        {t('messageLabel')}
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={4}
                                        className="w-full px-4 py-3 text-sm md:text-base rounded-md border border-deep-brown/20 focus:border-warm-sand focus:ring-2 focus:ring-warm-sand/20 outline-none transition-all resize-none"
                                        placeholder={t('messagePlaceholder')}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-deep-brown text-white px-6 py-3 md:py-4 rounded-md font-semibold hover:bg-[#3A2819] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                                >
                                    {t('submitButton')}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </section>
        </main>
    );
}
