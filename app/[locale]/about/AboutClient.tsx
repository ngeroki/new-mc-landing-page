'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from '@/routing';

export default function AboutClient() {
    const t = useTranslations('story');
    const tNav = useTranslations('nav');
    const ref = useRef(null);
    const timelineRef = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });
    const isTimelineInView = useInView(timelineRef, { once: true, margin: '-50px' });

    const values = [
        {
            titleKey: 'value1Title',
            descKey: 'value1Desc',
            icon: '✓',
        },
        {
            titleKey: 'value2Title',
            descKey: 'value2Desc',
            icon: '👥',
        },
        {
            titleKey: 'value3Title',
            descKey: 'value3Desc',
            icon: '⚡',
        },
    ];

    const stats = [
        { value: '20+', labelKey: 'stat1' },
        { value: '500+', labelKey: 'stat2' },
        { value: '100K+', labelKey: 'stat3' },
    ];

    const milestones = [
        { year: '2004', titleKey: 'milestone1Title', descKey: 'milestone1Desc' },
        { year: '2010', titleKey: 'milestone2Title', descKey: 'milestone2Desc' },
        { year: '2015', titleKey: 'milestone3Title', descKey: 'milestone3Desc' },
        { year: '2025', titleKey: 'milestone4Title', descKey: 'milestone4Desc' },
    ];

    return (
        <main className="min-h-screen bg-white">

            {/* Hero Section - Compact */}
            <section className="bg-gradient-to-b from-[#FDFBF7] to-white py-12 md:py-20">
                <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-2xl md:text-5xl lg:text-6xl font-heading font-semibold text-deep-brown mb-4">
                            {t('title')}
                        </h1>
                        <p className="text-base md:text-lg text-deep-brown/60 max-w-2xl mx-auto">
                            {t('subtitle')}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Stats Bar */}
            <section className="py-8 bg-[#F5E6CC]">
                <div className="max-w-5xl mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-3 gap-4 text-center">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.labelKey}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                            >
                                <div className="text-2xl md:text-4xl font-bold text-deep-brown">{stat.value}</div>
                                <div className="text-xs md:text-sm text-deep-brown/60">{t(stat.labelKey)}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Story Section - Clean Layout */}
            <section className="py-12 md:py-20">
                <div className="max-w-5xl mx-auto px-6 md:px-12">
                    <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                        {/* Image */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="order-2 md:order-1"
                        >
                            <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
                                <Image
                                    src="/images/company-story.jpg"
                                    alt="New MC Story"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </motion.div>

                        {/* Content */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="order-1 md:order-2"
                        >
                            <h2 className="text-2xl md:text-3xl font-heading font-semibold text-deep-brown mb-4">
                                {t('storyTitle')}
                            </h2>
                            <p className="text-sm md:text-base text-deep-brown/70 leading-relaxed mb-4">
                                {t('content')}
                            </p>
                            <p className="text-sm md:text-base text-deep-brown/70 leading-relaxed">
                                {t('storyText2')}
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Values Section - Horizontal Cards */}
            <section className="py-12 md:py-20 bg-[#FDFBF7]" ref={ref}>
                <div className="max-w-5xl mx-auto px-6 md:px-12">
                    <h2 className="text-2xl md:text-3xl font-heading font-semibold text-deep-brown text-center mb-8">
                        {t('valuesTitle')}
                    </h2>

                    <div className="grid md:grid-cols-3 gap-4 md:gap-6">
                        {values.map((value, index) => (
                            <motion.div
                                key={value.titleKey}
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                className="bg-white p-6 rounded-lg shadow-sm border border-deep-brown/5"
                            >
                                <div className="text-2xl mb-3">{value.icon}</div>
                                <h3 className="text-lg font-heading font-semibold text-deep-brown mb-2">
                                    {t(value.titleKey)}
                                </h3>
                                <p className="text-sm text-deep-brown/60 leading-relaxed">
                                    {t(value.descKey)}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Simple Timeline - Clean Vertical Design */}
            <section className="py-12 md:py-20 bg-white" ref={timelineRef}>
                <div className="max-w-3xl mx-auto px-6 md:px-12">
                    <h2 className="text-2xl md:text-3xl font-heading font-semibold text-deep-brown text-center mb-8 md:mb-12">
                        {t('journeyTitle')}
                    </h2>

                    <div className="relative">
                        {/* Vertical Line */}
                        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-deep-brown/10 transform md:-translate-x-1/2"></div>

                        <div className="space-y-8">
                            {milestones.map((milestone, index) => (
                                <motion.div
                                    key={milestone.year}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={isTimelineInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.5, delay: index * 0.15 }}
                                    className={`relative flex items-start gap-6 md:gap-0 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                                >
                                    {/* Dot */}
                                    <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-warm-sand rounded-full transform -translate-x-1/2 mt-1.5 z-10 ring-4 ring-white"></div>

                                    {/* Content */}
                                    <div className={`ml-10 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}>
                                        <div className="bg-[#FDFBF7] p-4 rounded-lg">
                                            <span className="text-lg md:text-xl font-bold text-warm-sand">{milestone.year}</span>
                                            <h3 className="text-base md:text-lg font-heading font-semibold text-deep-brown mt-1">
                                                {t(milestone.titleKey)}
                                            </h3>
                                            <p className="text-sm text-deep-brown/60 mt-1">
                                                {t(milestone.descKey)}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Spacer for desktop layout */}
                                    <div className="hidden md:block md:w-1/2"></div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section - Compact */}
            <section className="py-12 md:py-16 bg-deep-brown text-white text-center">
                <div className="max-w-3xl mx-auto px-6">
                    <h2 className="text-xl md:text-3xl font-heading font-semibold mb-4">{t('ctaTitle')}</h2>
                    <p className="text-sm md:text-base text-white/70 mb-6 max-w-xl mx-auto">
                        {t('ctaSubtitle')}
                    </p>
                    <Link
                        href="/contact"
                        className="inline-block px-8 py-3 bg-white text-deep-brown font-semibold rounded-full hover:bg-warm-sand hover:text-white transition-all duration-300"
                    >
                        {tNav('contact')}
                    </Link>
                </div>
            </section>
        </main>
    );
}
