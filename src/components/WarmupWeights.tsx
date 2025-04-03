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
        <div className="grid grid-cols-2 gap-px self-stretch rounded-md bg-[--element-bg] p-[--element-padding] shadow-lg sm:order-1 sm:basis-[30%]">
            <div className="col-span-2 rounded-t-md bg-[--header-bg] p-[--header-padding] text-center font-semibold italic shadow-sm">
                Warmup Weights
            </div>
            <div className="bg-gray-200 text-center font-semibold">Percentage</div>
            <div className="bg-gray-200 text-center font-semibold">Weight</div>
            <div className="bg-[--grid-bg] text-center text-[--grid-text] sm:leading-snug">75%</div>
            <div className="bg-[--grid-bg] text-center text-[--grid-text] sm:leading-snug">{roundedNumbersMemo.threeQuarters} kg</div>
            <div className="rounded-bl-md bg-[--grid-bg] text-center text-[--grid-text] sm:leading-snug">50%</div>
            <div className="rounded-br-md bg-[--grid-bg] text-center text-[--grid-text] sm:leading-snug">{roundedNumbersMemo.half} kg</div>
        </div>
    );
};

export default WarmupWeights;

export function isNumber(num: number | null) {
    return typeof num === "number" && isFinite(num);
}
