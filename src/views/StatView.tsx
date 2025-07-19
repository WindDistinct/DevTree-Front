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
        <div className="bg-white p-10 rounded-2xl shadow-sm">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">
                Estadísticas de tu Perfil
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                        Visitas Totales
                    </h3>
                    <p className="text-4xl font-bold text-gray-800">
                        {user.stats?.totalVisits || 0}
                    </p>
                </div>

                <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                        Visitantes Únicos
                    </h3>
                    <p className="text-4xl font-bold text-gray-800">
                        {user.stats?.uniqueVisitors?.length || 0}
                    </p>
                </div>

                <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                        Visitas Hoy
                    </h3>
                    <p className="text-4xl font-bold text-gray-800">
                        {stats.today}
                    </p>
                </div>
            </div>

            <VisitHeatmap data={stats.dailyActivity} />
        </div>
    )
}