
import { Label } from '../ui/label'
import type { PropControlsType } from './PropSliderControlMolecule'
import { Input } from '../ui/input'
const PropColorControl = ({ propName, propConfig, value, onChange }: PropControlsType) => {
    return (
        <div key={propName} className="space-y-2">
            <Label className="text-gray-300 capitalize">
                {propConfig.label || propName}
            </Label>
            <div className="flex items-center gap-3">
                <div
                    className="w-8 h-8 rounded-md border border-gray-700"
                    style={{
                        backgroundColor: value as string,
                    }}
                />
                <Input
                    type="color"
                    value={value as string}
                    onChange={(e) => onChange(propName, e.target.value)}
                    className="w-16 h-10 cursor-pointer"
                />
                <Input
                    type="text"
                    value={value as string}
                    onChange={(e) => onChange(propName, e.target.value)}
                    className="flex-1"
                />
            </div>
        </div>
    )
}

export default PropColorControl