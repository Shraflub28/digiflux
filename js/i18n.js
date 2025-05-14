// Internationalization
window.i18n = {
    currentLanguage: 'fr', // Default language
    translations: {},

// Initialize translations
    init: function() {
        // Load saved or default language
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage) {
            this.currentLanguage = savedLanguage;
        }
        
        // Set initial text direction
        this.setTextDirection();
        
        // Mark active language button
        this.updateLanguageButtons();
        
        // Load current language translations
        this.loadTranslations(this.currentLanguage);
    },
    
    // Load translations for a language
    loadTranslations: function(lang) {
        // Set up hardcoded fallback translations for essential UI elements
        const fallbackTranslations = {
            'fr': {
                // Navigation
                'nav_home': 'Accueil',
                'nav_about': 'À Propos',
                'nav_services': 'Services',
                'nav_approach': 'Notre Approche',
                'nav_contact': 'Contact',
                'nav_get_started': 'Commencer',
                'nav_projects': 'Projets',

                // Hero Section
                'hero_title': 'Transformer',
                'hero_subtitle': 'Présence Digitale',
                'hero_description': 'Stimuler la Croissance des Entreprises à l\'Ère Numérique',
                'hero_text': 'Votre agence digitale à service complet dédiée à permettre aux entreprises de prospérer dans un paysage numérique en constante évolution grâce à des solutions innovantes.',
                'hero_explore': 'Explorer Nos Services',
                'hero_get_started': 'Commencer',

                // Stats
                'stats_projects': 'Projets',
                'stats_satisfaction': 'Satisfaction Client',
                'stats_experience': 'Années d\'Expérience',

                // About Section
                'about_title': 'À Propos',
                'about_subtitle': 'de Nous',
                'about_description': 'DigiFlux est une agence digitale à service complet dédiée à aider les entreprises à prospérer dans le paysage numérique. Nous combinons créativité, technologie et réflexion stratégique pour fournir des solutions digitales complètes qui stimulent la croissance et améliorent votre présence en ligne.',
                'about_mission': 'Notre',
                'about_mission_title': 'Mission',
                'about_mission_text': 'Accélérer la croissance des entreprises grâce à des solutions digitales innovantes et une gestion stratégique de la présence en ligne, aidant nos clients à rester en avance dans un monde numérique en rapide évolution.',
                'about_contact': 'Contactez-Nous',

                // Services Section
                'services_title': 'Nos',
                'services_subtitle': 'Services',
                'service_web_title': 'Développement Web',
                'service_social_title': 'Gestion des Médias Sociaux',
                'service_video_title': 'Production Vidéo',
                
                // Service tags
                'service_tag_web': 'Web',
                'service_tag_social': 'Social',
                'service_tag_video': 'Vidéo',
                
                // Service details - Web
                'web_detail1': 'Conception et développement de sites web personnalisés',
                'web_detail2': 'Solutions e-commerce',
                'web_detail3': 'Conceptions responsives et adaptées aux mobiles',
                'web_detail4': 'Systèmes de gestion de contenu (CMS)',
                'web_detail5': 'Maintenance et support de sites web',
                'web_detail6': 'Architecture web optimisée pour le SEO',
                
                // Service details - Social
                'social_detail1': 'Gestion de comptes Instagram',
                'social_detail2': 'Création et curation de contenu',
                'social_detail3': 'Engagement communautaire',
                'social_detail4': 'Mise en œuvre de stratégie de croissance',
                'social_detail5': 'Analyse et suivi des performances',
                'social_detail6': 'Gestion multi-plateforme des médias sociaux',
                'social_detail7': 'Stratégie de hashtag et optimisation',
                
                // Service details - Video
                'video_detail1': 'Montage vidéo professionnel',
                'video_detail2': 'Contenu vidéo pour les médias sociaux',
                'video_detail3': 'Vidéos marketing et publicités',
                'video_detail4': 'Démonstrations de produits',
                'video_detail5': 'Vidéos corporate',
                'video_detail6': 'Motion graphics et animations',
                'video_detail7': 'Optimisation vidéo pour différentes plateformes',

                // Approach Section
                'approach_title': 'Notre',
                'approach_subtitle': 'Approche',

                // Why Choose Us Section
                'why_us_title': 'Pourquoi Choisir',
                'why_us_subtitle': 'DigiFlux',

                // Contact Section
                'contact_title': 'Contactez',
                'contact_subtitle': 'Nous',
                'contact_intro': 'Connectons-Nous',
                'contact_subintro': 'Contactez-nous via votre canal préféré',
                'contact_whatsapp': 'Discutez avec nous directement',
                'contact_instagram': 'Suivez nos dernières mises à jour',
                'contact_email': 'Envoyez-nous un message',

                // Footer
                'footer_description': 'Transformer la Présence Digitale, Stimuler la Croissance des Entreprises. Votre partenaire de confiance pour des solutions digitales complètes.',
                'footer_quick_links': 'Liens Rapides',
                'footer_services': 'Nos Services',
                'footer_copyright': '© 2025 DigiFlux. Tous droits réservés.',
                
                // Features
                'feature_comprehensive': 'Solutions digitales complètes sous un même toit',
                'feature_results': 'Approche axée sur les résultats avec des résultats mesurables',
                'feature_expertise': 'Expertise de l\'industrie et expérience étendue',
                'feature_technology': 'Technologie de pointe et outils innovants',
                'feature_support': 'Équipe de support dédiée disponible quand vous en avez besoin',
                'feature_transparent': 'Rapports transparents et communication claire',
                'feature_success': 'Bilan éprouvé de succès avec des clients satisfaits',
                'feature_turnaround': 'Délais d\'exécution rapides sans sacrifier la qualité',
                
                // Approach steps
                'approach_step1_title': 'Analyse',
                'approach_step1_text': 'Comprendre votre entreprise, vos objectifs et votre public cible grâce à une recherche complète et une analyse de données.',
                'approach_step2_title': 'Stratégie',
                'approach_step2_text': 'Développer des solutions digitales personnalisées adaptées à vos besoins commerciaux spécifiques et à votre position sur le marché.',
                'approach_step3_title': 'Mise en œuvre',
                'approach_step3_text': 'Exécuter les stratégies planifiées avec précision, attention aux détails et les meilleures pratiques de l\'industrie.',
                'approach_step4_title': 'Surveillance',
                'approach_step4_text': 'Suivre les performances et apporter des ajustements basés sur les données pour optimiser les résultats en temps réel.',
                'approach_step5_title': 'Optimisation',
                'approach_step5_text': 'Amélioration continue basée sur les résultats, les retours et les tendances émergentes dans le paysage numérique.',
                
                // Projects Section
                'projects_title': 'Nos',
                'projects_subtitle': 'Projets',
                'projects_intro': 'Découvrez quelques-uns de nos projets récents qui démontrent notre expertise et notre créativité.',
                'projects_view': 'Voir le Projet',
                'projects_coming_soon': 'Bientôt Disponible',
                'projects_discuss': 'Discuter de Votre Projet',
                'projects_cosamia_desc': 'Un site web moderne de restaurant avec un concept de fusion italo-marocaine, présentant un design élégant, un menu en ligne, des informations sur l\'emplacement et un système de commande fluide.',
                'projects_ecommerce_desc': 'Une solution e-commerce complète avec gestion des stocks, traitement des paiements et une interface conviviale conçue pour des taux de conversion optimaux.',
                'projects_photo_desc': 'Un site web de portfolio visuellement impressionnant pour un photographe professionnel, avec des galeries d\'images, un système de réservation et des témoignages de clients.'
            },
            'en': {
                // Navigation
                'nav_home': 'Home',
                'nav_about': 'About',
                'nav_services': 'Services',
                'nav_approach': 'Our Approach',
                'nav_contact': 'Contact',
                'nav_get_started': 'Get Started',
                'nav_projects': 'Projects',

                // Hero Section
                'hero_title': 'Transforming',
                'hero_subtitle': 'Digital Presence',
                'hero_description': 'Driving Business Growth in the Digital Age',
                'hero_text': 'Your full-service digital agency dedicated to empowering businesses to thrive in the ever-evolving digital landscape through innovative solutions.',
                'hero_explore': 'Explore Our Services',
                'hero_get_started': 'Get Started',

                // Stats
                'stats_projects': 'Projects',
                'stats_satisfaction': 'Client Satisfaction',
                'stats_experience': 'Years Experience',

                // About Section
                'about_title': 'About',
                'about_subtitle': 'Us',
                'about_description': 'DigiFlux is a full-service digital agency dedicated to empowering businesses to thrive in the digital landscape. We combine creativity, technology, and strategic thinking to deliver comprehensive digital solutions that drive growth and enhance your online presence.',
                'about_mission': 'Our',
                'about_mission_title': 'Mission',
                'about_mission_text': 'To accelerate business growth through innovative digital solutions and strategic online presence management, helping our clients stay ahead in the rapidly evolving digital world.',
                'about_contact': 'Get in Touch',

                // Services Section
                'services_title': 'Core',
                'services_subtitle': 'Services',
                'service_web_title': 'Website Development',
                'service_social_title': 'Social Media Management',
                'service_video_title': 'Video Production',
                
                // Service tags
                'service_tag_web': 'Web',
                'service_tag_social': 'Social',
                'service_tag_video': 'Video',
                
                // Service details - Web
                'web_detail1': 'Custom website design and development',
                'web_detail2': 'E-commerce solutions',
                'web_detail3': 'Responsive and mobile-first designs',
                'web_detail4': 'Content Management Systems (CMS)',
                'web_detail5': 'Website maintenance and support',
                'web_detail6': 'SEO-optimized web architecture',
                
                // Service details - Social
                'social_detail1': 'Instagram account management',
                'social_detail2': 'Content creation and curation',
                'social_detail3': 'Community engagement',
                'social_detail4': 'Growth strategy implementation',
                'social_detail5': 'Analytics and performance tracking',
                'social_detail6': 'Multi-platform social media management',
                'social_detail7': 'Hashtag strategy and optimization',
                
                // Service details - Video
                'video_detail1': 'Professional video editing',
                'video_detail2': 'Social media video content',
                'video_detail3': 'Marketing videos and commercials',
                'video_detail4': 'Product demonstrations',
                'video_detail5': 'Corporate videos',
                'video_detail6': 'Motion graphics and animations',
                'video_detail7': 'Video optimization for different platforms',

                // Approach Section
                'approach_title': 'Our',
                'approach_subtitle': 'Approach',

                // Why Choose Us Section
                'why_us_title': 'Why Choose',
                'why_us_subtitle': 'DigiFlux',

                // Contact Section
                'contact_title': 'Contact',
                'contact_subtitle': 'Us',
                'contact_intro': 'Let\'s Connect',
                'contact_subintro': 'Reach out through your preferred channel',
                'contact_whatsapp': 'Chat with us directly',
                'contact_instagram': 'Follow our latest updates',
                'contact_email': 'Send us a message',

                // Footer
                'footer_description': 'Transforming Digital Presence, Driving Business Growth. Your trusted partner for comprehensive digital solutions.',
                'footer_quick_links': 'Quick Links',
                'footer_services': 'Our Services',
                'footer_copyright': '© 2025 DigiFlux. All rights reserved.',
                
                // Features
                'feature_comprehensive': 'Comprehensive digital solutions under one roof',
                'feature_results': 'Results-driven approach with measurable outcomes',
                'feature_expertise': 'Industry expertise and extensive experience',
                'feature_technology': 'Cutting-edge technology and innovative tools',
                'feature_support': 'Dedicated support team available when you need us',
                'feature_transparent': 'Transparent reporting and clear communication',
                'feature_success': 'Proven track record of success with satisfied clients',
                'feature_turnaround': 'Fast turnaround times without sacrificing quality',
                
                // Approach steps
                'approach_step1_title': 'Analysis',
                'approach_step1_text': 'Understanding your business, goals, and target audience through comprehensive research and data analysis.',
                'approach_step2_title': 'Strategy',
                'approach_step2_text': 'Developing customized digital solutions tailored to your specific business needs and market position.',
                'approach_step3_title': 'Implementation',
                'approach_step3_text': 'Executing planned strategies with precision, attention to detail, and industry best practices.',
                'approach_step4_title': 'Monitoring',
                'approach_step4_text': 'Tracking performance and making data-driven adjustments to optimize results in real-time.',
                'approach_step5_title': 'Optimization',
                'approach_step5_text': 'Continuous improvement based on results, feedback, and emerging trends in the digital landscape.',
                
                // Projects Section
                'projects_title': 'Our',
                'projects_subtitle': 'Projects',
                'projects_intro': 'Take a look at some of our recent projects that demonstrate our expertise and creativity.',
                'projects_view': 'View Project',
                'projects_coming_soon': 'Coming Soon',
                'projects_discuss': 'Discuss Your Project',
                'projects_cosamia_desc': 'A modern restaurant website with Italian-Moroccan fusion concept, featuring an elegant design, online menu, location information, and seamless ordering system.',
                'projects_ecommerce_desc': 'A comprehensive e-commerce solution with inventory management, payment processing, and user-friendly interface designed for optimal conversion rates.',
                'projects_photo_desc': 'A visually stunning portfolio website for a professional photographer, featuring image galleries, booking system, and client testimonials.'
            },
            'ar': {
                // Navigation
                'nav_home': 'الرئيسية',
                'nav_about': 'من نحن',
                'nav_services': 'خدماتنا',
                'nav_approach': 'نهجنا',
                'nav_contact': 'اتصل بنا',
                'nav_get_started': 'ابدأ الآن',
                'nav_projects': 'المشاريع',

                // Hero Section
                'hero_title': 'تحويل',
                'hero_subtitle': 'التواجد الرقمي',
                'hero_description': 'دفع نمو الأعمال في العصر الرقمي',
                'hero_text': 'وكالتك الرقمية متكاملة الخدمات مكرسة لتمكين الشركات من الازدهار في المشهد الرقمي المتطور من خلال الحلول المبتكرة.',
                'hero_explore': 'استكشف خدماتنا',
                'hero_get_started': 'ابدأ الآن',

                // Stats
                'stats_projects': 'مشروع',
                'stats_satisfaction': 'رضا العملاء',
                'stats_experience': 'سنوات خبرة',

                // About Section
                'about_title': 'من',
                'about_subtitle': 'نحن',
                'about_description': 'ديجي فلكس هي وكالة رقمية متكاملة الخدمات مكرسة لتمكين الشركات من الازدهار في المشهد الرقمي. نحن نجمع بين الإبداع والتكنولوجيا والتفكير الاستراتيجي لتقديم حلول رقمية شاملة تدفع النمو وتعزز وجودك على الإنترنت.',
                'about_mission': 'مهمتنا',
                'about_mission_title': '',
                'about_mission_text': 'تسريع نمو الأعمال من خلال الحلول الرقمية المبتكرة وإدارة التواجد الإلكتروني الاستراتيجي، مما يساعد عملائنا على البقاء في الطليعة في عالم رقمي سريع التطور.',
                'about_contact': 'تواصل معنا',

                // Services Section
                'services_title': 'خدماتنا',
                'services_subtitle': 'الأساسية',
                'service_web_title': 'تطوير المواقع الإلكترونية',
                'service_social_title': 'إدارة وسائل التواصل الاجتماعي',
                'service_video_title': 'إنتاج الفيديو',
                
                // Service tags
                'service_tag_web': 'ويب',
                'service_tag_social': 'اجتماعي',
                'service_tag_video': 'فيديو',
                
                // Service details - Web
                'web_detail1': 'تصميم وتطوير مواقع الويب المخصصة',
                'web_detail2': 'حلول التجارة الإلكترونية',
                'web_detail3': 'تصميمات متجاوبة وأولوية للموبايل',
                'web_detail4': 'أنظمة إدارة المحتوى (CMS)',
                'web_detail5': 'صيانة المواقع الإلكترونية والدعم',
                'web_detail6': 'بنية الويب المحسّنة لمحركات البحث',
                
                // Service details - Social
                'social_detail1': 'إدارة حسابات انستغرام',
                'social_detail2': 'إنشاء وتنظيم المحتوى',
                'social_detail3': 'التفاعل مع المجتمع',
                'social_detail4': 'تنفيذ استراتيجية النمو',
                'social_detail5': 'تحليل وتتبع الأداء',
                'social_detail6': 'إدارة وسائل التواصل الاجتماعي متعددة المنصات',
                'social_detail7': 'استراتيجية الهاشتاج والتحسين',
                
                // Service details - Video
                'video_detail1': 'مونتاج فيديو احترافي',
                'video_detail2': 'محتوى فيديو لوسائل التواصل الاجتماعي',
                'video_detail3': 'فيديوهات تسويقية وإعلانات',
                'video_detail4': 'عروض توضيحية للمنتجات',
                'video_detail5': 'فيديوهات للشركات',
                'video_detail6': 'رسوم متحركة وحركية',
                'video_detail7': 'تحسين الفيديو لمختلف المنصات',

                // Approach Section
                'approach_title': 'نهجنا',
                'approach_subtitle': '',

                // Why Choose Us Section
                'why_us_title': 'لماذا تختار',
                'why_us_subtitle': 'ديجي فلكس',

                // Contact Section
                'contact_title': 'اتصل',
                'contact_subtitle': 'بنا',
                'contact_intro': 'لنتواصل',
                'contact_subintro': 'تواصل معنا عبر قناتك المفضلة',
                'contact_whatsapp': 'تحدث معنا مباشرة',
                'contact_instagram': 'تابع آخر تحديثاتنا',
                'contact_email': 'أرسل لنا رسالة',

                // Footer
                'footer_description': 'تحويل التواجد الرقمي، ودفع نمو الأعمال. شريكك الموثوق للحلول الرقمية الشاملة.',
                'footer_quick_links': 'روابط سريعة',
                'footer_services': 'خدماتنا',
                'footer_copyright': '© 2025 ديجي فلكس. جميع الحقوق محفوظة.',
                
                // Features
                'feature_comprehensive': 'حلول رقمية شاملة تحت سقف واحد',
                'feature_results': 'نهج قائم على النتائج مع نتائج قابلة للقياس',
                'feature_expertise': 'خبرة في الصناعة وتجربة واسعة',
                'feature_technology': 'تكنولوجيا متطورة وأدوات مبتكرة',
                'feature_support': 'فريق دعم مخصص متاح عندما تحتاج إلينا',
                'feature_transparent': 'تقارير شفافة وتواصل واضح',
                'feature_success': 'سجل حافل من النجاح مع عملاء راضين',
                'feature_turnaround': 'أوقات إنجاز سريعة دون التضحية بالجودة',
                
                // Approach steps
                'approach_step1_title': 'التحليل',
                'approach_step1_text': 'فهم عملك وأهدافك وجمهورك المستهدف من خلال البحث الشامل وتحليل البيانات.',
                'approach_step2_title': 'الاستراتيجية',
                'approach_step2_text': 'تطوير حلول رقمية مخصصة تناسب احتياجات عملك المحددة وموقعك في السوق.',
                'approach_step3_title': 'التنفيذ',
                'approach_step3_text': 'تنفيذ الاستراتيجيات المخططة بدقة واهتمام بالتفاصيل وأفضل ممارسات الصناعة.',
                'approach_step4_title': 'المراقبة',
                'approach_step4_text': 'تتبع الأداء وإجراء تعديلات قائمة على البيانات لتحسين النتائج في الوقت الفعلي.',
                'approach_step5_title': 'التحسين',
                'approach_step5_text': 'تحسين مستمر بناءً على النتائج والتعليقات والاتجاهات الناشئة في المشهد الرقمي.',
                
                // Projects Section
                'projects_title': 'مشاريعنا',
                'projects_subtitle': '',
                'projects_intro': 'إلقِ نظرة على بعض مشاريعنا الحديثة التي توضح خبرتنا وإبداعنا.',
                'projects_view': 'عرض المشروع',
                'projects_coming_soon': 'قريبًا',
                'projects_discuss': 'ناقش مشروعك',
                'projects_cosamia_desc': 'موقع مطعم عصري بمفهوم المزج بين المطبخ الإيطالي والمغربي، يتميز بتصميم أنيق، وقائمة طعام عبر الإنترنت، ومعلومات عن الموقع، ونظام طلبات سلس.',
                'projects_ecommerce_desc': 'حل تجارة إلكترونية شامل مع إدارة المخزون، ومعالجة المدفوعات، وواجهة سهلة الاستخدام مصممة لمعدلات تحويل مثالية.',
                'projects_photo_desc': 'موقع محفظة مذهل بصريًا لمصور محترف، يضم معارض صور، ونظام حجز، وشهادات العملاء.'
            }
        };
        
        // Use the fallback translations as a starting point
        if (fallbackTranslations[lang]) {
            this.translations[lang] = fallbackTranslations[lang];
            
            // Update the content with what we have so far
            this.updateContent();
        }
    },
    
    // Change language
    changeLanguage: function(lang) {
        if (lang === this.currentLanguage) return;
        
        // Update current language
        this.currentLanguage = lang;
        
        // Load translations if not already loaded
        if (!this.translations[lang]) {
            this.loadTranslations(lang);
        } else {
            // If already loaded, just update the content
            this.updateContent();
        }
        
        // Update UI to reflect language change
        this.updateLanguageButtons();
        this.setTextDirection();
        
        // Save preference
        localStorage.setItem('language', lang);
    },
    
    // Update all translatable content
    updateContent: function() {
    const elements = document.querySelectorAll('[data-i18n]');
        const currentTranslations = this.translations[this.currentLanguage];
        
        if (!currentTranslations) return;
        
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (currentTranslations[key]) {
                element.textContent = currentTranslations[key];
            }
        });
        
        // Preserve the "DigiFlux" brand name in all languages
        if (this.currentLanguage === 'ar') {
            // For Arabic, ensure the DigiFlux name preserves its order
            document.querySelectorAll('.logo h1, .footer-logo h2').forEach(el => {
                el.innerHTML = 'ديجي<span class="highlight-text">فلكس</span>';
            });
        } else {
            // For other languages
            document.querySelectorAll('.logo h1, .footer-logo h2').forEach(el => {
                el.innerHTML = 'Digi<span class="highlight-text">Flux</span>';
            });
        }
    },
    
    // Update language selector buttons
    updateLanguageButtons: function() {
        const langButtons = document.querySelectorAll('.lang-btn');
        langButtons.forEach(button => {
            const buttonLang = button.getAttribute('data-lang');
            if (buttonLang === this.currentLanguage) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    },
    
    // Set text direction based on language
    setTextDirection: function() {
        if (this.currentLanguage === 'ar') {
            document.documentElement.setAttribute('dir', 'rtl');
        } else {
            document.documentElement.setAttribute('dir', 'ltr');
        }
    }
};

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    i18n.init();
}); 