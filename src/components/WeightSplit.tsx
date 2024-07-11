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
        <div className="grid w-56 grid-cols-2 rounded-md border-2 border-gray-300 bg-gray-300 text-sm shadow-md">
            <div className="border-b-2 border-gray-300 bg-gray-200 p-1 text-center">Percentage</div>
            <div className=" border-b-2 border-l border-gray-300 bg-gray-200 p-1 text-center">Weight</div>

            <div className="border-b text-center">50%</div>
            <div className="border-b  border-l text-center">{roundedNumbersMemo.half}</div>
            <div className="border-b text-center">75%</div>
            <div className="border-b  border-l text-center">{roundedNumbersMemo.threeQuarters}</div>
            <div className="border-b text-center">100%</div>
            <div className="border-b  border-l text-center">{roundedNumbersMemo.full}</div>
        </div>
    );
};

export default WeightSplit;

export function isNumber(num: number | null) {
    return typeof num === "number" && isFinite(num);
}
