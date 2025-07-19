import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { User } from '../types'
import VisitHeatmap from '../components/VisitHeatmap'
import { ActivityStatsResponse, getActivityStats } from '../api/DevTreeAPI'

export default function StatsView() {
    const queryClient = useQueryClient()
    const user: User = queryClient.getQueryData(['user'])!
    const [stats, setStats] = useState<ActivityStatsResponse>({
        today: 0,
        dailyActivity: []
    })

    useEffect(() => {
        getActivityStats(user.handle)
            .then(setStats)
            .catch(console.error)
    }, [user.handle])

    return (
        <div className="bg-white p-10 rounded-lg">
            <h2 className="text-2xl font-bold mb-5">Estadísticas de tu Perfil</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
                <div className="bg-gray-100 p-5 rounded-lg">
                    <h3 className="font-bold">Visitas Totales</h3>
                    <p className="text-3xl">{user.stats?.totalVisits || 0}</p>
                </div>

                <div className="bg-gray-100 p-5 rounded-lg">
                    <h3 className="font-bold">Visitantes Únicos</h3>
                    <p className="text-3xl">{user.stats?.uniqueVisitors?.length || 0}</p>
                </div>

                <div className="bg-gray-100 p-5 rounded-lg">
                    <h3 className="font-bold">Visitas Hoy</h3>
                    <p className="text-3xl">{stats.today}</p>
                </div>
            </div>

            <VisitHeatmap data={stats.dailyActivity} />
        </div>
    )
}