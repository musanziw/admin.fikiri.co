import { PrismaClient } from '@prisma/client';
import { fa, faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    await prisma.role.createMany({
        data: [{ name: 'CURATOR', }, { name: 'EXPLORATOR', }, { name: 'USER', }],
    });

    await prisma.status.createMany({
        data: [{ name: 'En attente' }, { name: 'Cartographiée' }, { name: 'Explorée' }, { name: 'Experimentée' }]
    })

    await prisma.maturity.createMany({
        data: [{ name: 'Idée' }, { name: 'Prototype' }, { name: 'MVP' }, { name: 'Produit finii' }]
    })


    await prisma.user.create({
        data: {
            name: "Berry Numbi",
            email: 'BerryN@lunnovel.org',
            password: await bcrypt.hash('admin', 10),
            phoneNumber: '+243999999999',
            address: faker.location.streetAddress(),
            roles: {
                connect: {
                    id: 1
                },
            }
        },
    });

    await prisma.call.create({
        data: {
            name: 'CARTOGRAPHIE DES DEFIS ET SOLUTIONS INNOVANTES LOCALES',
            description: `L’objectif principal est de rechercher, identifier les solutions locales innovantes au sein des communautés, des
            institutions publiques, Mairies, secteur privé, des communes, des structures à caractère social (Prisons,
            Hôpitaux, Centre d'hébergement des enfants, Marchés, centre de recherches et universités).`,
            startedAt: new Date(2023, 11, 3),
            endedAt: new Date(2023, 11, 15),
            thematics: {
                create: [
                    {
                        name: `Transparence et eécurité dans l’artisanat Minier`,
                        odds: '3, 8',
                        challenges: {
                            create: [
                                {
                                    name: `Faible connaissance de l’artisanat minier dans le pays `
                                },
                                {
                                    name: `Absence de base de données fiables`
                                },
                                {
                                    name: `Conduite de l’activité par des paysans ou des groupes de paysans isolés, non structurés`
                                },
                                {
                                    name: `Résistance des artisans à la normalisation de l’activité et à la déclaration de leur production`
                                },
                                {
                                    name: `Techniques d’exploitation rudimentaires à forts impacts environnementaux et sanitaires`
                                }, {
                                    name: `Manque de traçabilité des minerais exploités `
                                }, {
                                    name: `Trafic illicite aux frontières`
                                }, {
                                    name: `Faible taux d’exploitants déclarés, détenteurs de carte professionnelle`
                                }, {
                                    name: `Inaccessibilité aux microcrédits`
                                }, {
                                    name: `Mécanismes/pratiques innovantes de prévention d’éboulements et d’inondations dans les trous`
                                }, {
                                    name: `Mécanismes de prévention d’étouffements ou asphyxie due à la baisse d’oxygène`
                                }, {
                                    name: `Outil numérique d’enregistrement, d’identification, de géolocalisation et de suivi au profit des administrateurs de foyer minier des carrés minier d’exploitation artisanale`
                                }, {
                                    name: `Le droit à l’information (notamment sur les conséquences environnementales et sociales ainsi que les potentialités de l’industrie extractive`
                                }, {
                                    name: `La faible vulgarisation du code de conduite en responsabilité sociale des exploitant miniers`
                                }, {
                                    name: `L’inexistence d’un répertoire géolocalisé des entreprises minières et des ressources naturelles par les riverains `
                                }, {
                                    name: `Le manque d’outil de mesure de l’impact de l’exploitation des ressources naturelles sur l’environnement, la santé, les dynamiques sociales, l’économie, les infrastructures et les moyens de subsistance des communautés riveraines `
                                }, {
                                    name: `Outil de suivi de la mise en œuvre des engagements des miniers vis-à-vis des comités avec un module de suivi des projets (par cahier des chargés et localités) financés sur base des redevances minières au niveau des ETD`
                                }, {
                                    name: `Outil innovant d’identification, de centralisation et d’approbation des besoins prioritaires des communautés par le comité local de développement`
                                }, {
                                    name: `Plateforme électronique de publication régulièrement mise à jour, de notification, de soumission, de gestion des opportunités de business locales pour les sous-traitants`
                                }, {
                                    name: `Mise en place mécanismes de recours/ de réparation innovant : notamment une plateforme citoyenne des dénonciations, d’informations et des soumissions des recours tant aux entreprises minières qu’aux instances étatiques`
                                }
                            ]
                        }
                    }, {
                        name: `Inclusion financière digitale des opérateurs informels`,
                        odds: '1, 8, 10',
                        challenges: {
                            create: [
                                {
                                    name: `Transactions électroniques`
                                }, {
                                    name: `Gestion de l'Inventaire et des ventes`
                                }, {
                                    name: `Formation et éducation financière`
                                }, {
                                    name: `Assurance et épargne`
                                }, {
                                    name: `Connectivité et accès à l'Information`
                                }, {
                                    name: `Développement de plateformes de vente en ligne`
                                }
                            ]
                        }
                    },
                    {
                        name: `Mécanisation Légère agricole`,
                        odds: '2, 8',
                        challenges: {
                            create: [
                                {
                                    name: `Préparation du sol`
                                }, {
                                    name: `Labour et ensemencement`
                                }, {
                                    name: `Labour et ensemencement`
                                }, {
                                    name: `Épandage d’engrais`
                                }, {
                                    name: `Désherbage`
                                }, {
                                    name: `Alimentation et reproduction animale`
                                }, {
                                    name: `Recueillir les produits (traire les vaches, ramasser les œufs, tondre les moutons)`
                                }, {
                                    name: `Traçabilité des animaux : tatouage, puce électronique, marquage, etc.`
                                }, {
                                    name: `Transformer les produits (lait utilisé pour faire du fromage, par exemple)`
                                }
                            ]
                        }
                    }, {
                        name: `L’amélioration de la mobilité urbaine`,
                        odds: '9, ',
                        challenges: {
                            create: [
                                {
                                    name: `Le mauvais état de la voirie`
                                }, {
                                    name: `La configuration coloniale de Kinshasa`
                                }, {
                                    name: `L’incivisme routier `
                                }, {
                                    name: `La mauvaise régulation routière`
                                }, {
                                    name: `Le retour des pluies diluviennes`
                                }, {
                                    name: 'La mauvaise régulation routière'
                                }, {
                                    name: 'L’absence de sanctions efficaces à l’encontre des contrevenants'
                                }, {
                                    name: 'L’insuffisance d’agents qualifiés exposés à la corruption'
                                }, {
                                    name: 'Le mauvais parking des transporteurs'
                                }
                            ]
                        }
                    }
                ]
            }
        },
    })
}

// execute the main function
main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        // close Prisma Client at the end
        await prisma.$disconnect();
    });