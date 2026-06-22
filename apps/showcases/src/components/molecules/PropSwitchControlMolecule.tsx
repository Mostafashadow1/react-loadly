import type { PropControlsType } from './PropSliderControlMolecule'
import { Label } from '../ui/label'
import { Checkbox } from '../ui/checkbox'

const PropSwitchControl = ({ propName, propConfig, value, onChange }: PropControlsType) => {
    return (
        <div
            key={propName}
            className="flex items-center justify-between py-2"
        >
            <Label className="text-gray-300 capitalize">
                {propConfig.label || propName}
            </Label>
            <Checkbox
                checked={Boolean(value)}
                onCheckedChange={(checked) => onChange(propName, checked)}
            />
        </div>
    )
}

export default PropSwitchControl