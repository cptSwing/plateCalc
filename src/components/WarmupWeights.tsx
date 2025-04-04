import { useMemo } from "react";

const WarmupWeights = ({
    targetWeightState,
}: {
    targetWeightState: [number | null, React.Dispatch<React.SetStateAction<number | null>>];
}) => {
    const [targetWeight] = targetWeightState;

    const roundedNumbersMemo = useMemo(() => {
        if (isNumber(targetWeight)) {
            return {
                half: (targetWeight as number) * 0.5,
                threeQuarters: (targetWeight as number) * 0.75,
            };
        } else {
            return {
                half: 0,
                threeQuarters: 0,
            };
        }
    }, [targetWeight]);

    return (
        <div className="self-stretch rounded-md bg-[--grid-bg] p-[--grid-padding] shadow-lg sm:order-1 sm:basis-[30%]">
            <div className="mb-[--grid-gap-y] rounded-t-md bg-[--grid-header-bg] p-[--grid-header-padding] text-center font-semibold text-[--grid-header-text-color]">
                Warmup Weights
            </div>
            <div className="grid grid-cols-2 gap-x-[--grid-gap-x] gap-y-[--grid-gap-y]">
                <div className="bg-gray-200 px-[--grid-element-padding-x] text-right font-semibold">Percent %</div>
                <div className="bg-gray-200 px-[--grid-element-padding-x] text-right font-semibold">Weight (kg)</div>
                <div className="bg-[--grid-element-bg-1] px-[--grid-element-padding-x] text-right font-mono text-[--grid-element-text-color] sm:leading-snug">
                    75
                </div>
                <div className="bg-[--grid-element-bg-1] px-[--grid-element-padding-x] text-right font-mono text-[--grid-element-text-color] sm:leading-snug">
                    {roundedNumbersMemo.threeQuarters}
                </div>
                <div className="rounded-bl-md bg-[--grid-element-bg-1] px-[--grid-element-padding-x] text-right font-mono text-[--grid-element-text-color] sm:leading-snug">
                    50
                </div>
                <div className="rounded-br-md bg-[--grid-element-bg-1] px-[--grid-element-padding-x] text-right font-mono text-[--grid-element-text-color] sm:leading-snug">
                    {roundedNumbersMemo.half}
                </div>
            </div>
        </div>
    );
};

export default WarmupWeights;

export function isNumber(num: number | null) {
    return typeof num === "number" && isFinite(num);
}
