import odd1 from '@/public/goals/F-WEB-Goal-01.png'
import odd2 from '@/public/goals/F-WEB-Goal-02.png'
import odd3 from '@/public/goals/F-WEB-Goal-03.png'
import odd4 from '@/public/goals/F-WEB-Goal-04.png'
import odd5 from '@/public/goals/F-WEB-Goal-05.png'
import odd6 from '@/public/goals/F-WEB-Goal-06.png'
import odd7 from '@/public/goals/F-WEB-Goal-07.png'
import odd8 from '@/public/goals/F-WEB-Goal-08.png'
import odd9 from '@/public/goals/F-WEB-Goal-09.png'
import odd10 from '@/public/goals/F-WEB-Goal-10.png'
import odd11 from '@/public/goals/F-WEB-Goal-11.png'
import odd12 from '@/public/goals/F-WEB-Goal-12.png'
import odd13 from '@/public/goals/F-WEB-Goal-13.png'
import odd14 from '@/public/goals/F-WEB-Goal-14.png'
import odd15 from '@/public/goals/F-WEB-Goal-15.png'
import odd16 from '@/public/goals/F-WEB-Goal-16.png'
import odd17 from '@/public/goals/F-WEB-Goal-17.png'
import Image from "next/image";
import Link from "next/link";

export default function Sdg() {
    const sdgs = [
        {
            oddImage: odd1,
            oddTitle: 'Éliminer la pauvreté sous toutes ses formes et partout dans le monde'
        },
        {
            oddImage: odd2,
            oddTitle: 'Éliminer la faim, assurer la sécurité alimentaire, améliorer la nutrition et promouvoir l’agriculture durable'
        },
        {
            oddImage: odd3,
            oddTitle: 'Permettre à tous de vivre en bonne santé et promouvoir le bien-être de tous à tout âge'
        },
        {
            oddImage: odd4,
            oddTitle: 'Assurer l’accès de tous à une éducation de qualité, sur un pied d’égalité, et promouvoir les possibilités d’apprentissage tout au long de la vie'
        },
        {
            oddImage: odd5,
            oddTitle: 'Parvenir à l’égalité des sexes et autonomiser toutes les femmes et les filles'
        },
        {
            oddImage: odd6,
            oddTitle: 'Garantir l’accès de tous à des services d’alimentation en eau et d’assainissement gérés de façon durable'
        },
        {
            oddImage: odd7,
            oddTitle: 'Garantir l’accès de tous à des services énergétiques fiables, durables et modernes, à un coût abordable'
        },
        {
            oddImage: odd8,
            oddTitle: 'Promouvoir une croissance économique soutenue, partagée et durable, le plein emploi productif et un travail décent pour tous'
        },
        {
            oddImage: odd9,
            oddTitle: 'Bâtir une infrastructure résiliente, promouvoir une industrialisation durable qui profite à tous et encourager l’innovation'
        },
        {
            oddImage: odd10,
            oddTitle: 'Réduire les inégalités dans les pays et d’un pays à l’autre'
        },
        {
            oddImage: odd11,
            oddTitle: 'Faire en sorte que les villes et les établissements humains soient ouverts à tous, sûrs, résilients et durables\n'
        },
        {
            oddImage: odd12,
            oddTitle: 'Établir des modes de consommation et de production durables'
        },
        {
            oddImage: odd13,
            oddTitle: 'Prendre d’urgence des mesures pour lutter contre les changements climatiques et leurs répercussions'
        },
        {
            oddImage: odd14,
            oddTitle: 'Conserver et exploiter de manière durable les océans, les mers et les ressources marines aux fins du développement durable'
        },
        {
            oddImage: odd15,
            oddTitle: 'Préserver et restaurer les écosystèmes terrestres, en veillant à les exploiter de façon durable,...'
        },
        {
            oddImage: odd16,
            oddTitle: 'Promouvoir des sociétés pacifiques et inclusives pour le développement durable, permettre un accès à la justice pour tous...'
        },
        {
            oddImage: odd17,
            oddTitle: 'Renforcer les moyens de mettre en œuvre le Partenariat mondial pour le développement et le revitaliser.'
        }
    ]

    return (
        <div className={'p-8 mx-auto max-w-screen-lg'}>
            <h2 className={'font-bold text-2xl mb-8'}>Les objectifs de développement durables durables</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                {
                    sdgs.map((sdg, index) =>
                        (
                            <Link href={''} className={'flex flex-col gap-4 justify-start items-start'} key={index}>
                                <div className={'w-20 h-20 relative'}>
                                    <Image src={sdg.oddImage} layout={'fill'} objectFit={'contain'} alt={sdg.oddTitle}/>
                                </div>
                                <p className={'font-semibold'}>{sdg.oddTitle}</p>
                            </Link>
                        )
                    )
                }

            </div>


        </div>
    )
}