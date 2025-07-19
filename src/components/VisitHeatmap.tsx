import CalendarHeatmap from 'react-calendar-heatmap'
import 'react-calendar-heatmap/dist/styles.css'
import { Tooltip as ReactTooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'

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
        <div className="p-4 bg-white rounded-lg shadow-md">
            <CalendarHeatmap
                startDate={startDate}
                endDate={endDate}
                values={data}
                classForValue={(value) => {
                    if (!value || value.count === 0) return 'color-empty'
                    if (value.count < 6) return 'color-scale-1'
                    if (value.count < 10) return 'color-scale-2'
                    if (value.count < 16) return 'color-scale-3'
                    return 'color-scale-4'
                }}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                tooltipDataAttrs={(value: any) => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    if (!value?.date) return {} as any
                    return {
                        'data-tooltip-id': 'visit-tooltip',
                        'data-tooltip-content': `${value.count} visita${value.count > 1 ? 's' : ''}`
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    } as any
                }}
                showWeekdayLabels={true}
            />

            <ReactTooltip className="!bg-gray-900 !text-white !text-sm !px-3 !py-2 !rounded" id="visit-tooltip" place="right" />
        </div>
    )
}
