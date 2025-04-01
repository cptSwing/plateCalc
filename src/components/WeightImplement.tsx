import { useMemo } from "react";
import usePlates from "../hooks/usePlates";
import { ImplementDataType, ImplementEnum, ImplementsType, RecordEntry } from "../types/plate-calculator";

const WeightImplement = ({
    targetWeightState,
    implementData,
}: {
    targetWeightState: [number | null, React.Dispatch<React.SetStateAction<number | null>>];
    implementData: [keyof ImplementsType, number];
}) => {
    const [implementName, implementWeight] = implementData;
    const [targetWeight] = targetWeightState;
    const safeTargetWeight = targetWeight ?? 0;

    const numPlates = usePlates();

    const implementData_Memo: ImplementDataType = useMemo(() => {
        return {
            implementType: implementName,
            implementWeight: implementWeight,
            implementSides: implementName === "2 Dumbbells" ? 4 : 2,
            multipleImplements: implementName === "2 Dumbbells" ? true : false,
        };
    }, [implementData]);

    const closestWeights_Memo = useMemo(() => {
        const { implementWeight, implementSides, multipleImplements } = implementData_Memo;

        const targetWeightWithSides = multipleImplements ? implementWeight * 2 : implementWeight;
        const targetWeightCorrected = (safeTargetWeight - targetWeightWithSides) / implementSides;

        const setLimits = getSetLimits(numPlates, multipleImplements);

        return countWeightPlates(targetWeightCorrected, setLimits);
    }, [safeTargetWeight, implementData_Memo]);

    const targetWeight_Memo = useMemo(() => {
        const { implementWeight, multipleImplements } = implementData_Memo;
        return multipleImplements ? (safeTargetWeight - implementWeight * 2) / 2 / 2 : (safeTargetWeight - implementWeight) / 2;
    }, [safeTargetWeight, implementData_Memo]);

    return (
        <>
            {/* Tool */}
            <div className="relative flex items-center justify-between bg-[--grid-bg] text-[--grid-text]">
                <div className="absolute left-1 inline-block">{implementData_Memo.implementType}</div>
                <div className="absolute right-1 inline-block">({implementData_Memo.implementWeight} kg)</div>
            </div>

            {/* Add kg / side */}
            <div className="bg-[--grid-bg] text-center text-[--grid-text]">{targetWeight_Memo}</div>

            {/* Add Plates / side */}
            <ReturnSorted plates={closestWeights_Memo.plates} />

            {/* Closest */}
            <div className="bg-[--grid-bg] text-center text-[--grid-text]">
                {(implementData_Memo.multipleImplements ? closestWeights_Memo.achievedWeight * 2 : closestWeights_Memo.achievedWeight) * 2 +
                    (implementData_Memo.multipleImplements
                        ? implementData_Memo.implementWeight * 2
                        : implementData_Memo.implementWeight)}{" "}
                kg
            </div>
        </>
    );
};

export default WeightImplement;

const ReturnSorted = ({ plates }: { plates: PlateCountType }) => {
    return (
        <div className="grid size-full grid-cols-7">
            <div className="flex size-full items-center justify-center text-center odd:bg-gray-100 even:bg-gray-200" key={"15"}>
                {plates["15"] ? <span className="font-bold text-green-600">{plates["15"]}</span> : <span className="text-gray-400">0</span>}
            </div>

            <div className="flex size-full items-center justify-center text-center odd:bg-gray-100 even:bg-gray-200" key={"10"}>
                {plates["10"] ? <span className="font-bold text-green-600">{plates["10"]}</span> : <span className="text-white">0</span>}
            </div>

            <div className="flex size-full items-center justify-center text-center odd:bg-gray-100 even:bg-gray-200" key={"5"}>
                {plates["5"] ? <span className="font-bold text-green-600">{plates["5"]}</span> : <span className="text-gray-400">0</span>}
            </div>

            <div className="flex size-full items-center justify-center text-center odd:bg-gray-100 even:bg-gray-200" key={"2.5"}>
                {plates["2.5"] ? <span className="font-bold text-green-600">{plates["2.5"]}</span> : <span className="text-white">0</span>}
            </div>

            <div className="flex size-full items-center justify-center text-center odd:bg-gray-100 even:bg-gray-200" key={"2"}>
                {plates["2"] ? <span className="font-bold text-green-600">{plates["2"]}</span> : <span className="text-gray-400">0</span>}
            </div>

            <div className="flex size-full items-center justify-center text-center odd:bg-gray-100 even:bg-gray-200" key={"1.25"}>
                {plates["1.25"] ? (
                    <span className="font-bold text-green-600">{plates["1.25"]}</span>
                ) : (
                    <span className="text-white">0</span>
                )}
            </div>

            <div className="flex size-full items-center justify-center text-center odd:bg-gray-100 even:bg-gray-200" key={"0.5"}>
                {plates["0.5"] ? (
                    <span className="font-bold text-green-600">{plates["0.5"]}</span>
                ) : (
                    <span className="text-gray-400">0</span>
                )}
            </div>
        </div>
    );
};

const getSetLimits = (numPlates: [number, number][], multipleDb: boolean) =>
    numPlates.map(([type, count]) => [type, platesPerSide(count, multipleDb)] as [number, number]);

type PlateCountType = { [key: number]: number };
type UsedPlatesType = PlateCountType;

const countWeightPlates = (targetWeight: number, platesPerSideCounts: [number, number][]) => {
    const findCombination = (remainingWeight: number, index: number, usedPlates: UsedPlatesType, achievedWeight: number) => {
        if (remainingWeight === 0 || index >= platesPerSideCounts.length) {
            return { achievedWeight, plates: usedPlates };
        }

        const plateWeight = platesPerSideCounts[index][0];
        const plateCount = Math.min(platesPerSideCounts[index][1] || 0, Math.floor(remainingWeight / plateWeight));

        let bestResult = { achievedWeight, plates: usedPlates };
        for (let count = plateCount; count >= 0; count--) {
            const result = findCombination(
                remainingWeight - count * plateWeight,
                index + 1,
                { ...usedPlates, [plateWeight]: count },
                achievedWeight + count * plateWeight,
            );
            if (
                result.plates !== null &&
                (bestResult.plates === null ||
                    Math.abs(targetWeight - result.achievedWeight) < Math.abs(targetWeight - bestResult.achievedWeight))
            ) {
                bestResult = result;
            }
        }

        return bestResult;
    };

    const bestCombination = findCombination(targetWeight, 0, {}, 0);
    return bestCombination;
};

const platesPerSide = (count: number, isMultiple: boolean) => {
    if (isMultiple) {
        const quartered = count / 4;
        const floored = Math.floor(quartered);
        const isDecimal = floored !== quartered;
        const decimalReturn = isDecimal && floored > 0 ? floored : 0;

        return isDecimal ? decimalReturn : quartered;
    } else {
        return count / 2;
    }
};
