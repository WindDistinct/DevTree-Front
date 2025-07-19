import { SocialNetwork, UserHandle } from "../types"

type HandleDataProps = {
    data: UserHandle
}
export default function HandleData({ data }: HandleDataProps) {

    const links: SocialNetwork[] = JSON.parse(data.links).filter((link: SocialNetwork) => link.enabled)

    return (
        <div className="space-y-8 text-white">
            {/* Nombre de usuario */}
            <p className="text-4xl md:text-5xl text-center font-extrabold tracking-wide">
                {data.handle}
            </p>

            {/* Imagen de perfil */}
            {data.image && (
                <img
                    src={data.image}
                    alt="Imagen de perfil"
                    className="w-40 h-40 mx-auto rounded-full object-cover border-4 border-white shadow-lg"
                />
            )}

            {/* Descripción */}
            <p className="text-center text-lg font-medium max-w-xl mx-auto text-slate-200">
                {data.description}
            </p>

            {/* Enlaces sociales */}
            <div className="mt-16 flex flex-col gap-6">
                {links.length > 0 ? (
                    links.map((link) => (
                        <a
                            key={link.name}
                            href={link.url}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="bg-white hover:bg-slate-100 transition px-6 py-3 rounded-xl flex items-center gap-4 shadow group"
                        >
                            <img
                                src={`/social/icon_${link.name}.svg`}
                                alt={`Icono de ${link.name}`}
                                className="w-10 h-10"
                            />
                            <p className="text-slate-800 font-semibold text-lg group-hover:text-cyan-600 transition">
                                Visita mi: <span className="capitalize">{link.name}</span>
                            </p>
                        </a>
                    ))
                ) : (
                    <p className="text-center text-slate-200">No hay enlaces en este perfil</p>
                )}
            </div>
        </div>
    )
}
