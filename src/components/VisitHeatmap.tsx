import CalendarHeatmap from 'react-calendar-heatmap'
import 'react-calendar-heatmap/dist/styles.css'

interface VisitActivity {
    date: string
    count: number
}

export default function VisitHeatmap({ data }: { data: VisitActivity[] }) {
    const startDate = new Date()
    startDate.setMonth(startDate.getMonth() - 5)

    const endDate = new Date()
    endDate.setMonth(endDate.getMonth() + 1)

    return (
        <div>
            <CalendarHeatmap
                startDate={startDate}
                endDate={endDate}
                values={data}
                classForValue={(value) => {
                    if (!value || value.count === 0) return 'color-empty'
                    if (value.count < 3) return 'color-scale-1'
                    if (value.count < 6) return 'color-scale-2'
                    if (value.count < 10) return 'color-scale-3'
                    return 'color-scale-4'
                }}
                titleForValue={(value) => {
                    if (!value || !value.count) return ''
                    return `${value.date}: ${value.count} visita${value.count > 1 ? 's' : ''}`
                }}
                showWeekdayLabels={true}
            />
        </div>
    )
}
