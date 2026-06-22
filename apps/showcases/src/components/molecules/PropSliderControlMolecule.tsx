import type { PropControlConfig } from '@/utils/loaderPropsConfig'
import { type ReactNode } from 'react'
import { Label } from '../ui/label'
import { Badge } from '../ui/badge'
import { Slider } from '../ui/slider'
export type PropControlsType = {
    propName: string;
    propConfig: PropControlConfig;
    value: string | number | boolean | ReactNode | undefined;
    onChange: (name: string, value: any) => void;
}
const PropSliderControl = ({ propName, propConfig, value, onChange }: PropControlsType) => {
    return (
        <div key={propName} className="space-y-2">
            <div className="flex justify-between">
                <Label className="text-gray-300 capitalize">
                    {propConfig.label || propName}
                </Label>
                <Badge variant="outline" className="text-xs">
                    {value}
                    {propConfig.unit || ""}
                </Badge>
            </div>
            <Slider
                min={propConfig.min}
                max={propConfig.max}
                step={propConfig.step}
                value={[value as number]}
                onValueChange={(val) => onChange(propName, val[0])}
            />
        </div>
    )
}

export default PropSliderControl