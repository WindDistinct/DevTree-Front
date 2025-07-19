import { Link, Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable'
import NavigationTabs from "./NavigationTabs"
import { SocialNetwork, User } from '../types'
import { useEffect, useState } from 'react'
import DevTreeLink from './DevTreeLink'
import { useQueryClient } from '@tanstack/react-query'
import Header from './Header'

type DevTreeProps = {
    data: User
}

export default function DevTree({ data }: DevTreeProps) {

    const [enabledLinks, setEnabledLinks] = useState<SocialNetwork[]>(JSON.parse(data.links).filter((item: SocialNetwork) => item.enabled))

    useEffect(() => {
        setEnabledLinks(JSON.parse(data.links).filter((item: SocialNetwork) => item.enabled))
    }, [data])

    const queryClient = useQueryClient()
    const handleDragEnd = (e: DragEndEvent) => {
        const { active, over } = e

        if (over && over.id) {
            const prevIndex = enabledLinks.findIndex(link => link.id === active.id)
            const newIndex = enabledLinks.findIndex(link => link.id === over.id)
            const order = arrayMove(enabledLinks, prevIndex, newIndex)
            setEnabledLinks(order)

            const disabledLinks: SocialNetwork[] = JSON.parse(data.links).filter((item: SocialNetwork) => !item.enabled)
            const links = order.concat(disabledLinks)
            queryClient.setQueryData(['user'], (prevData: User) => {
                return {
                    ...prevData,
                    links: JSON.stringify(links)
                }
            })

        }
    }

    return (
        <>
            <Header />

            <div className="bg-gray-100 min-h-screen py-10">
                <main className="mx-auto max-w-6xl px-4 md:px-0">
                    <NavigationTabs />

                    {/* Link a perfil */}
                    <div className="flex justify-end mt-6">
                        <Link
                            className="text-cyan-600 hover:text-cyan-700 font-semibold text-xl transition"
                            to={`/${data.handle}`}
                            target="_blank"
                            rel="noreferrer noopener"
                        >
                            Visitar Mi Perfil: /{data.handle}
                        </Link>
                    </div>

                    {/* Zona principal */}
                    <div className="flex flex-col md:flex-row gap-10 mt-10">
                        {/* Contenido editable */}
                        <section className="flex-1">
                            <Outlet />
                        </section>

                        {/* Vista previa del perfil */}
                        <aside className="w-full md:w-96 bg-slate-800 rounded-xl px-6 py-8 shadow-md space-y-6">
                            <p className="text-3xl font-bold text-center text-white tracking-wide">
                                {data.handle}
                            </p>

                            {data.image && (
                                <img
                                    src={data.image}
                                    alt="Imagen de Perfil"
                                    className="mx-auto max-w-[220px] rounded-full border-4 border-white shadow-md"
                                />
                            )}

                            <p className="text-center text-base font-semibold text-white">
                                {data.description}
                            </p>

                            <DndContext
                                collisionDetection={closestCenter}
                                onDragEnd={handleDragEnd}
                            >
                                <div className="mt-12 flex flex-col gap-4">
                                    <SortableContext
                                        items={enabledLinks}
                                        strategy={verticalListSortingStrategy}
                                    >
                                        {enabledLinks.map(link => (
                                            <DevTreeLink key={link.name} link={link} />
                                        ))}
                                    </SortableContext>
                                </div>
                            </DndContext>
                        </aside>
                    </div>
                </main>
            </div>

            <Toaster position="top-right" />
        </>
    )
}
