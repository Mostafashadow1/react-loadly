import { Label } from '../ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import type { PropControlsType } from './PropSliderControlMolecule'

const PropSelectControl = ({ propName, propConfig, value, onChange }: PropControlsType) => {
    return (
        <div key={propName} className="space-y-2">
            <Label className="text-gray-300 capitalize">
                {propConfig.label || propName}
            </Label>
            <Select
                value={value as string}
                onValueChange={(val) => onChange(propName, val)}
            >
                <SelectTrigger className="border border-indigo-400 bg-indigo-950/60 text-white hover:bg-indigo-900/60 focus:ring-2 focus:ring-indigo-400">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-indigo-950 border border-indigo-700 shadow-lg rounded-xl">
                    {propConfig.options?.map((option) => (
                        <SelectItem
                            key={option}
                            value={option}
                            className="text-indigo-100 hover:bg-indigo-700 hover:text-white focus:bg-indigo-600 focus:text-white cursor-pointer rounded-md px-2 py-1 transition-colors"
                        >
                            {option}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}

export default PropSelectControl