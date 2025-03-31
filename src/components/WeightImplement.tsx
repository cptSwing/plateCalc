import { useMemo } from "react";

const WeightImplement = ({
    targetWeightState,
    implement,
}: {
    targetWeightState: [number | null, React.Dispatch<React.SetStateAction<number | null>>];
    implement: ImplementEnum;
}) => {
    const [targetWeight] = targetWeightState;
    const safeTargetWeight_Memo = useMemo(() => targetWeight ?? 0, [targetWeight]);

    const implementData_Memo: ImplementType = useMemo(() => {
        return {
            implementType: ImplementEnum[implement],
            implementWeight: implement,
            implementSides: ImplementEnum[implement] === "2 Dumbbells" ? 4 : 2,
            multipleImplements: ImplementEnum[implement] === "2 Dumbbells" ? true : false,
        };
    }, [implement]);

    const closestWeights_Memo = useMemo(() => {
        const { implementWeight, implementSides, multipleImplements } = implementData_Memo;

        const targetWeightWithSides = multipleImplements ? implementWeight * 2 : implementWeight;
        const targetWeightCorrected = (safeTargetWeight_Memo - targetWeightWithSides) / implementSides;

        const setLimits = getSetLimits(multipleImplements);

        return countWeightPlates(targetWeightCorrected, setLimits);
    }, [safeTargetWeight_Memo, implementData_Memo]);

    const targetWeight_Memo = useMemo(() => {
        const { implementWeight, multipleImplements } = implementData_Memo;
        return multipleImplements ? (safeTargetWeight_Memo - implementWeight * 2) / 2 / 2 : (safeTargetWeight_Memo - implementWeight) / 2;
    }, [safeTargetWeight_Memo, implementData_Memo]);

    return (
        <>
            {/* Gear */}
            <div className="relative bg-[--grid-bg] text-[--grid-text]">
                <span className="absolute left-1">{implementData_Memo.implementType}</span>
                <span className="absolute right-1">({implementData_Memo.implementWeight} kg)</span>
            </div>

            {/* Add kg per side */}
            <div className="bg-[--grid-bg] text-center text-[--grid-text]">{targetWeight_Memo}</div>

            {/* Plates to Add */}
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
                {plates["10"] ? <span className="font-bold text-green-600">{plates["10"]}</span> : <span className="text-gray-50">0</span>}
            </div>

            <div className="flex size-full items-center justify-center text-center odd:bg-gray-100 even:bg-gray-200" key={"5"}>
                {plates["5"] ? <span className="font-bold text-green-600">{plates["5"]}</span> : <span className="text-gray-400">0</span>}
            </div>

            <div className="flex size-full items-center justify-center text-center odd:bg-gray-100 even:bg-gray-200" key={"2.5"}>
                {plates["2.5"] ? (
                    <span className="font-bold text-green-600">{plates["2.5"]}</span>
                ) : (
                    <span className="text-gray-50">0</span>
                )}
            </div>

            <div className="flex size-full items-center justify-center text-center odd:bg-gray-100 even:bg-gray-200" key={"2"}>
                {plates["2"] ? <span className="font-bold text-green-600">{plates["2"]}</span> : <span className="text-gray-400">0</span>}
            </div>

            <div className="flex size-full items-center justify-center text-center odd:bg-gray-100 even:bg-gray-200" key={"1.25"}>
                {plates["1.25"] ? (
                    <span className="font-bold text-green-600">{plates["1.25"]}</span>
                ) : (
                    <span className="text-gray-50">0</span>
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

const getSetLimits = (multipleDb: boolean) => ({
    "15": quarterIfMultiple(2, multipleDb),
    "10": quarterIfMultiple(6, multipleDb),
    "5": quarterIfMultiple(8, multipleDb),
    "2.5": quarterIfMultiple(8, multipleDb),
    "2": quarterIfMultiple(4, multipleDb),
    "1.25": quarterIfMultiple(6, multipleDb),
    "0.5": quarterIfMultiple(8, multipleDb),
});

type WeightPlatesType = number[];
type PlateCountType = { [key: number]: number };
type UsedPlatesType = PlateCountType;

function countWeightPlates(targetWeight: number, plateCounts: PlateCountType) {
    const weightPlates: WeightPlatesType = Object.entries(plateCounts).map(([string]) => parseFloat(string));

    // Sort the weight plates array in descending order
    const weightPlatesSorted = [...weightPlates].sort((a, b) => b - a);

    function findCombination(remainingWeight: number, index: number, usedPlates: UsedPlatesType, achievedWeight: number) {
        if (remainingWeight === 0 || index >= weightPlatesSorted.length) {
            return { achievedWeight, plates: usedPlates };
        }

        const plateWeight = weightPlatesSorted[index];
        const plateCount = Math.min(plateCounts[plateWeight] || 0, Math.floor(remainingWeight / plateWeight));

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
    }

    const bestCombination = findCombination(targetWeight, 0, {}, 0);
    return bestCombination;
}

const quarterIfMultiple = (num: number, isMultiple: boolean) => {
    if (isMultiple) {
        const quartered = num / 4;
        const floored = Math.floor(quartered);
        const isDecimal = floored !== quartered;
        const decimalReturn = isDecimal && floored > 0 ? floored : 0;

        return isDecimal ? decimalReturn : quartered;
    } else {
        return num / 2;
    }
};

export enum ImplementEnum {
    "Trapbar" = 16,
    "Barbell" = 10,
    "EzBar" = 7.5,
    "Dumbbell" = 2,
    "2 Dumbbells" = 2.5,
}

export enum PlateCountEnum {
    "_15" = 2,
    "_10" = 6,
    "_5" = 8,
    "_2.5" = 10,
    "_2" = 4,
    "_1.25" = 6,
    "_0.5" = 8,
}

type ImplementType = {
    implementType: string;
    implementWeight: ImplementEnum;
    implementSides: number;
    multipleImplements: boolean;
};
