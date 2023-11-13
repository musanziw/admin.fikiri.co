export function Footer() {
    return (
        <div className={'bg-indigo-800 p-16'}>
            <div className={'lg:mx-auto lg:max-w-screen-lg flex flex-col gap-4 lg:flex-row justify-between'}>
                <h1 className={'text-white text-4xl font-bold mb-4'}>
                    Fikiri
                </h1>
                <div className={'flex flex-col gap-5'}>
                    <div className={'flex flex-col gap-2'}>
                        <h5 className={'text-white uppercase font-bold'}>
                            Contact
                        </h5>
                        <div className={'flex flex-col gap-1'}>
                            <a href="mailto:" className={'text-white'}>
                                contact@fikiri.com</a>
                        </div>
                    </div>
                    <div className={'flex flex-col gap-2'}>
                        <h5 className={'text-white uppercase font-bold'}>
                            Adresse
                        </h5>
                        <div className={'flex flex-col gap-1'}>
                            <p className={'text-white'}>
                                123 Avenue de la Révolution, Lubumbashi, RDC
                            </p>
                        </div>
                    </div>

                    <p>
                        © 2021 Fikiri. All rights reserved.
                    </p>

                </div>
            </div>
        </div>
    )
}