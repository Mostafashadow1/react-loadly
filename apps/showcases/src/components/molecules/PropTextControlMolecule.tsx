import type { PropControlsType } from './PropSliderControlMolecule'
import { Label } from '../ui/label'
import { Input } from '../ui/input'

const PropTextControl = ({ propName, propConfig, value, onChange }: PropControlsType) => {
    return (
        <div key={propName} className="space-y-2">
            <Label className="text-gray-300 capitalize">
                {propConfig.label || propName}
            </Label>
            <div className="border border-gray-700 rounded p-3">
                <Input
                    type="text"
                    value={(value as string) || ""}
                    onChange={(e) => onChange(propName, e.target.value)}
                    placeholder={propConfig.placeholder}
                    className="
    w-full
    font-mono
    text-[#d6deeb]
    bg-[#011627]
    border-0
    outline-none
    p-2
    whitespace-pre
    rounded-0
  "
                />
            </div>
        </div>
    )
}

export default PropTextControl