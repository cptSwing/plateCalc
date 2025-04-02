import { useMemo } from "react";

const WeightSplit = ({
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
                full: targetWeight as number,
            };
        } else {
            return {
                half: 0,
                threeQuarters: 0,
                full: 0,
            };
        }
    }, [targetWeight]);

    return (
        <div className="order-2 grid grid-cols-2 gap-px self-stretch rounded-md bg-[--element-bg] p-[--element-padding] shadow-lg sm:order-3 sm:basis-1/3">
            <div className="rounded-tl-md bg-[--header-bg] p-[--header-padding] text-center font-semibold italic shadow-sm">Percentage</div>
            <div className="rounded-tr-md bg-[--header-bg] p-[--header-padding] text-center font-semibold italic shadow-sm">Weight</div>

            <div className="bg-[--grid-bg] text-center text-[--grid-text]">50%</div>
            <div className="bg-[--grid-bg] text-center text-[--grid-text]">{roundedNumbersMemo.half}</div>
            <div className="bg-[--grid-bg] text-center text-[--grid-text]">75%</div>
            <div className="bg-[--grid-bg] text-center text-[--grid-text]">{roundedNumbersMemo.threeQuarters}</div>
            <div className="rounded-bl-md bg-[--grid-bg] text-center text-[--grid-text]">100%</div>
            <div className="rounded-br-md bg-[--grid-bg] text-center text-[--grid-text]">{roundedNumbersMemo.full}</div>
        </div>
    );
};

export default WeightSplit;

export function isNumber(num: number | null) {
    return typeof num === "number" && isFinite(num);
}
