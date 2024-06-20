import { useMemo } from "react";
import { isNumber } from "./WeightSplit";

const PerWeightImplement = ({
    targetWeightState,
    implement,
}: {
    targetWeightState: [number | null, React.Dispatch<React.SetStateAction<number | null>>];
    implement: ImplementEnum;
}) => {
    const [targetWeight] = targetWeightState;

    const implementReturnMemo = useMemo(() => {
        const implementData: ImplementType = {
            implementType: ImplementEnum[implement],
            implementWeight: implement,
            implementSides: 2,
        };

        let markup = <></>;
        const w = isNumber(targetWeight) ? (targetWeight as number) : 0;
        switch (implementData.implementType) {
            case "TrapBar":
                markup = markupWrap(implementData, w);
                break;
            case "BarBell":
                markup = markupWrap(implementData, w);
                break;
            case "EzBar":
                markup = markupWrap(implementData, w);
                break;
            case "DumbBell":
                markup = markupWrap(implementData, w);
                break;
            // eg "Dumbbells":
            default:
                markup = markupWrap({ ...implementData, implementSides: 4 }, w, true);
                break;
        }

        return markup;
    }, [implement, targetWeight]);

    return implementReturnMemo;
};

export default PerWeightImplement;

export const getSetLimits = (multipleDb: boolean) => ({
    "15": quarterIfMultiple(2, multipleDb),
    "10": quarterIfMultiple(6, multipleDb),
    "5": quarterIfMultiple(8, multipleDb),
    "2.5": quarterIfMultiple(8, multipleDb),
    "2": quarterIfMultiple(4, multipleDb),
    "1.25": quarterIfMultiple(6, multipleDb),
    "0.5": quarterIfMultiple(8, multipleDb),
});

function markupWrap(data: ImplementType, target: number, multipleDb = false) {
    const setLimits = getSetLimits(multipleDb);
    const safeSet = Object.entries(setLimits).map(([string]) => parseFloat(string));

    const targetWeightWithSides = multipleDb ? data.implementWeight * 2 : data.implementWeight;
    const targetWeightCorrected = (target - targetWeightWithSides) / data.implementSides;
    const closest = countWeightPlates(targetWeightCorrected, safeSet, setLimits);

    return (
        <>
            {/* Count */}
            <div className="w-full border-b pl-1 text-center italic">{data.implementSides / 2}</div>

            {/* Gear */}
            <div className="col-span-2 flex  w-full items-center justify-between border-b border-l px-1">
                <div>{data.implementType}</div>
                <div className="mr-0 whitespace-nowrap text-xs">({data.implementWeight} kg)</div>
            </div>

            {/* Add per side */}
            <div className="col-span-2 w-full border-b border-l pl-1 text-center">
                {returnTargetWeight(target, data.implementWeight, multipleDb)}
            </div>

            {/* Plates to Add */}
            <div className="col-span-4 w-full border-b border-l">
                <ReturnSorted plates={closest.plates} />
            </div>

            {/* Closest */}
            <div className="col-span-2 w-full border-b border-l pl-1 text-center">
                {(multipleDb ? closest.achievedWeight * 2 : closest.achievedWeight) * 2 +
                    (multipleDb ? data.implementWeight * 2 : data.implementWeight)}{" "}
                kg
            </div>
        </>
    );
}

const ReturnSorted = ({ plates }: { plates: PlateCountType }) => {
    const returnMarkup = [];

    returnMarkup.push(
        <div className="w-full bg-gray-100 text-center" key={"0.5"}>
            {plates["0.5"] ? <span className="font-bold text-green-600">{plates["0.5"]}</span> : <span className="text-gray-300">0</span>}
        </div>,
    );

    returnMarkup.push(
        <div className="mx-auto" key={"1.25"}>
            {plates["1.25"] ? <span className="font-bold text-green-600">{plates["1.25"]}</span> : <span className="text-gray-300">0</span>}
        </div>,
    );

    returnMarkup.push(
        <div className="w-full bg-gray-100 text-center" key={"2"}>
            {plates["2"] ? <span className="font-bold text-green-600">{plates["2"]}</span> : <span className="text-gray-300">0</span>}
        </div>,
    );

    returnMarkup.push(
        <div className="mx-auto" key={"2.5"}>
            {plates["2.5"] ? <span className="font-bold text-green-600">{plates["2.5"]}</span> : <span className="text-gray-300">0</span>}
        </div>,
    );

    returnMarkup.push(
        <div className="w-full bg-gray-100 text-center" key={"5"}>
            {plates["5"] ? <span className="font-bold text-green-600">{plates["5"]}</span> : <span className="text-gray-300">0</span>}
        </div>,
    );

    returnMarkup.push(
        <div className="mx-auto" key={"10"}>
            {plates["10"] ? <span className="font-bold text-green-600">{plates["10"]}</span> : <span className="text-gray-300">0</span>}
        </div>,
    );

    returnMarkup.push(
        <div className="w-full bg-gray-100 text-center" key={"15"}>
            {plates["15"] ? <span className="font-bold text-green-600">{plates["15"]}</span> : <span className="text-gray-300">0</span>}
        </div>,
    );

    return <div className="grid w-full grid-cols-7">{returnMarkup.map((elem) => elem)}</div>;
};

type WeightPlatesType = number[];
type PlateCountType = { [key: number]: number };
type UsedPlatesType = PlateCountType;

function countWeightPlates(targetWeight: number, weightPlates: WeightPlatesType, plateCounts: PlateCountType) {
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

function returnTargetWeight(weight: number | null, implementWeight: number, multipleDb = false) {
    const defaultNum = 0;
    return multipleDb
        ? weight
            ? (weight - implementWeight * 2) / 2 / 2
            : defaultNum
        : weight
          ? (weight - implementWeight) / 2
          : defaultNum;
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
    "TrapBar" = 16,
    "BarBell" = 10,
    "EzBar" = 7.5,
    "DumbBell" = 2,
    "DumbBells" = 2.5,
}

export enum PlateCountEnum {
    "_15" = 2,
    "_10" = 6,
    "_5" = 8,
    "_2.5" = 8,
    "_2" = 4,
    "_1.25" = 6,
    "_0.5" = 8,
}

type ImplementType = {
    implementType: string;
    implementWeight: ImplementEnum;
    implementSides: number;
};
