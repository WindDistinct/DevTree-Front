import { Switch } from '@headlessui/react'
import { DevTreeLink } from "../types"
import { classNames } from '../utils'

type DevTreeInputProps = {
    item: DevTreeLink
    handleUrlChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleEnableLink: (socialNetwork: string) => void
}

export default function DevTreeInput({ item, handleUrlChange, handleEnableLink }: DevTreeInputProps) {

    return (
        <div className="bg-slate-50 shadow-md rounded-xl px-4 py-3 flex items-center gap-4">
            <div
                className="w-10 h-10 bg-center bg-contain bg-no-repeat"
                style={{ backgroundImage: `url('/social/icon_${item.name}.svg')` }}
            ></div>

            <input
                type="text"
                className="flex-1 px-3 py-2 rounded-lg border border-gray-300 text-sm text-slate-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
                value={item.url}
                onChange={handleUrlChange}
                name={item.name}
                placeholder="https://tusocial.com/usuario"
            />

            <Switch
                checked={item.enabled}
                name={item.name}
                onChange={() => handleEnableLink(item.name)}
                className={classNames(
                    item.enabled ? 'bg-cyan-500' : 'bg-gray-300',
                    'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2'
                )}
            >
                <span
                    aria-hidden="true"
                    className={classNames(
                        item.enabled ? 'translate-x-5' : 'translate-x-0',
                        'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out self-center'
                    )}
                />
            </Switch>
        </div>
    )
}
