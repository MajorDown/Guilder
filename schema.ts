const schema = {
    header: {
        div_title: {
            href: '/',
            h1: 'Guilder',
            logo: '/images/logo.png'
        },
        nav_navbar: {
            if_visitMode: [
                { 
                    type: "link", 
                    text: 'Se connecter', 
                    icon: '/images/login.png',
                    href: '/login'
                },
            ],
            if_userMode: [
                {
                    type: "link",
                    text: 'déclarer une intervention',
                    icon: '/images/new-intervention.png',
                    href: '/new-intervention',
                },
                {
                    type : "link",
                    text: '/Ma guilde',
                    icon: '/images/my-guild.png',
                    href: '/my-guild',                
                },
                { 
                    type: "link",
                    text: 'Mon compte',
                    icon: '/images/my-account.png',
                    href: '/my-account'
                },
                {
                    type : "button",
                    text: 'Se déconnecter',
                    icon: '/images/logout.png',
                    href: '/'
                }
            ],
            if_adminMode: [
                {
                    type: "link",
                    text: 'Interventions',
                    icon: '/images/interventions.png',
                    href: '/interventions',
                },
                {
                    type : "link",
                    text: '/Configurer ma guilde',
                    icon: '/images/configure-my-guild.png',
                    href: '/configure-my-guild',                
                },
                { 
                    type: "link",
                    text: 'Mon compte',
                    icon: '/images/my-account.png', 
                    href: '/my-account'
                },
                {
                    type : "button",
                    text: 'Se déconnecter',
                    icon: '/images/logout.png',
                    href: '/'
                }
            ]
        }
    },
    main: {
        section_accuail: {
            h2: 'Bienvenue sur Guilder !',
            div_presentation: {
                p_1: "Guilder est une application web qui permet de favoriser et gérer l'entraide au sein de votre collectif.",
                p_2: "Le concept est simple : En tant que membre de votre guilde, vous pouvez déclarer une intervention que vous aurez réalisée pour un autre membre.",
                p_3: "en déclarant une intervention, votre compteur de points augmente en fonction de la nature de l'intervention, ainsi que le nombre d'heure effectuées.",
                p_4: "Le membre qui aura bénéficié de votre intervention, quand à lui, verra son compteur de point diminuer de la même valeur.",
            },
        },
    }
}