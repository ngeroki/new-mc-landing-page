'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function AboutPage() {
    const t = useTranslations('story');
    const credibilityT = useTranslations('credibility');
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const values = [
        {
            title: 'Kualitas Terjamin',
            description: 'Setiap produk melalui kontrol kualitas ketat untuk memastikan standar tinggi yang konsisten.',
            icon: (
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
        },
        {
            title: 'Kepercayaan Mitra',
            description: 'Ratusan mitra bisnis di seluruh Indonesia mempercayakan kebutuhan sandal mereka kepada kami.',
            icon: (
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            ),
        },
        {
            title: 'Inovasi Berkelanjutan',
            description: 'Kami terus berinovasi untuk menghadirkan produk yang sesuai dengan kebutuhan pasar.',
            icon: (
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            ),
        },
    ];

    const milestones = [
        { year: '2004', title: 'Pendirian', description: 'New MC didirikan dengan visi menjadi pemasok sandal terpercaya' },
        { year: '2010', title: 'Ekspansi', description: 'Memperluas jaringan distribusi ke seluruh provinsi di Indonesia' },
        { year: '2015', title: 'Pertumbuhan', description: 'Mencapai 500+ mitra bisnis aktif di seluruh Nusantara' },
        { year: '2024', title: 'Masa Kini', description: 'Terus berkembang dengan komitmen kualitas dan pelayanan terbaik' },
    ];

    return (
        <main className="min-h-screen pt-24">
            {/* Hero Section */}
            <section className="py-16 bg-[#FDFBF7]">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-semibold text-deep-brown mb-4">
                            {t('title')}
                        </h1>
                        <p className="text-lg text-deep-brown/70 max-w-2xl mx-auto">
                            Perjalanan kami menjadi pemasok grosir sandal terpercaya di Indonesia
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="relative w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-xl"
                        >
                            <Image
                                src="/images/company-story.jpg"
                                alt="New MC Warehouse"
                                fill
                                className="object-cover"
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="space-y-6"
                        >
                            <div>
                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-semibold text-deep-brown mb-4">
                                    Cerita Kami
                                </h2>
                                <div className="w-20 h-1 bg-warm-sand mb-6"></div>
                            </div>
                            <p className="text-lg text-deep-brown/80 leading-relaxed">
                                {t('content')}
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-16 bg-[#FEF1DE]" ref={ref}>
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-4xl lg:text-5xl font-heading font-semibold text-deep-brown text-center mb-16"
                    >
                        Nilai-Nilai Kami
                    </motion.h2>

                    <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
                        {values.map((value, index) => (
                            <motion.div
                                key={value.title}
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 text-center"
                            >
                                <div className="text-warm-sand mb-6 flex justify-center">
                                    {value.icon}
                                </div>
                                <h3 className="text-xl md:text-2xl font-heading font-semibold text-deep-brown mb-4">
                                    {value.title}
                                </h3>
                                <p className="text-base text-deep-brown/70 leading-relaxed">
                                    {value.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline Section */}
            <section className="py-16 bg-white">
                <div className="max-w-4xl mx-auto px-6 md:px-12">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-semibold text-deep-brown text-center mb-16">
                        Perjalanan Kami
                    </h2>

                    <div className="space-y-12">
                        {milestones.map((milestone, index) => (
                            <motion.div
                                key={milestone.year}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                className="flex items-start gap-6"
                            >
                                <div className="flex-shrink-0 w-24 text-right">
                                    <span className="text-3xl font-heading font-bold text-warm-sand">
                                        {milestone.year}
                                    </span>
                                </div>
                                <div className="flex-shrink-0 w-4 h-4 bg-warm-sand rounded-full mt-2"></div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-heading font-semibold text-deep-brown mb-2">
                                        {milestone.title}
                                    </h3>
                                    <p className="text-lg text-deep-brown/70">
                                        {milestone.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
