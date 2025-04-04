import { useMemo } from "react";
import usePlates from "../hooks/usePlates";
import { BarDataType, BarEnum, BarsType, RecordEntry } from "../types/plate-calculator";
import classNames from "../lib/classNames";

const WeightBar = ({
    gridRow,
    targetWeightState,
    barData,
}: {
    gridRow: number;
    targetWeightState: [number | null, React.Dispatch<React.SetStateAction<number | null>>];
    barData: [keyof BarsType, number];
}) => {
    const [barName, barWeight] = barData;
    const [targetWeight] = targetWeightState;
    const safeTargetWeight = targetWeight ?? 0;

    const numPlates = usePlates();

    const barData_Memo: BarDataType = useMemo(() => {
        return {
            barType: barName,
            barWeight: barWeight,
            barSides: barName === "2 Dumbbells" ? 4 : 2,
            multipleBars: barName === "2 Dumbbells" ? true : false,
        };
    }, [barData]);

    const weightsPerSide_Memo = useMemo(() => {
        const { barWeight, barSides, multipleBars } = barData_Memo;

        const targetWeightWithSides = multipleBars ? barWeight * 2 : barWeight;
        const targetWeightCorrected = (safeTargetWeight - targetWeightWithSides) / barSides;

        const setLimits = getSetLimits(numPlates, multipleBars);

        return countWeightPlates(targetWeightCorrected, setLimits);
    }, [safeTargetWeight, barData_Memo]);

    const targetWeightPerSide_Memo = useMemo(() => {
        const { barWeight, multipleBars } = barData_Memo;
        return multipleBars ? (safeTargetWeight - barWeight * 2) / 2 / 2 : (safeTargetWeight - barWeight) / 2;
    }, [safeTargetWeight, barData_Memo]);

    const closestResult_Memo = useMemo(() => {
        const closestPerSide = weightsPerSide_Memo.achievedWeight;
        const toolWeight = barData_Memo.barWeight;

        let closestTotal;
        if (barData_Memo.multipleBars) {
            closestTotal = closestPerSide * 2 * 2 + toolWeight * 2;
        } else {
            closestTotal = closestPerSide * 2 + toolWeight;
        }

        return {
            total: closestTotal,
            side: closestPerSide,
        };
    }, [weightsPerSide_Memo, barData_Memo]);

    return (
        <>
            {/* Tool */}
            <div
                className="type relative bg-[--grid-element-bg-1] px-[--grid-element-padding-x] text-[--grid-element-text-color] [&:nth-child(8n+1)]:bg-[--grid-element-bg-2]"
                style={{
                    gridRow: `plate-grid-row-first ${gridRow}`,
                }}
            >
                <span className="float-left">{barData_Memo.barType}</span>
                <span className="float-right font-mono">{barData_Memo.barWeight}</span>
            </div>

            {/* Closest */}
            <div
                className={classNames(
                    "bg-[--grid-element-bg-1] px-[--grid-element-padding-x] text-right font-mono [&:nth-child(8n+2)]:bg-[--grid-element-bg-2]",
                    safeTargetWeight !== closestResult_Memo.total ? "text-red-600" : "text-[--grid-element-text-color]",
                )}
                style={{
                    gridRow: `plate-grid-row-first ${gridRow}`,
                }}
            >
                {closestResult_Memo.total}
            </div>

            {/* Add Plates / side */}
            <ReturnSorted plates={weightsPerSide_Memo.plates} gridRow={gridRow} />

            {/* Add kg / side */}
            <div
                className="bg-[--grid-element-bg-1] px-[--grid-element-padding-x] text-right font-mono text-[--grid-element-text-color] [&:nth-child(8n+4)]:bg-[--grid-element-bg-2]"
                style={{
                    gridRow: `plate-grid-row-second ${gridRow}`,
                }}
            >
                {closestResult_Memo.side}
                {/* {safeTargetWeight !== closestResult_Memo.total && targetWeightPerSide_Memo > 0 && (
                    <span className="font-mono text-red-300 line-through"> ({targetWeightPerSide_Memo})</span>
                )} */}
            </div>
        </>
    );
};

export default WeightBar;

const ReturnSorted = ({ plates, gridRow }: { plates: PlateCountType; gridRow: number }) => {
    return (
        <div
            className="grid grid-cols-7 bg-[--grid-element-bg-1] [&:nth-child(8n+3)]:bg-[--grid-element-bg-2]"
            style={{
                gridRow: `plate-grid-row-second ${gridRow}`,
            }}
        >
            <div className=" bg-gray-200/70 text-center font-mono" key={"15"}>
                {plates["15"] ? <span className="font-bold text-green-600">{plates["15"]}</span> : <span className="text-white ">0</span>}
            </div>

            <div className="text-center font-mono" key={"10"}>
                {plates["10"] ? <span className="font-bold text-green-600">{plates["10"]}</span> : <span className="text-white ">0</span>}
            </div>

            <div className=" bg-gray-200/70 text-center font-mono" key={"5"}>
                {plates["5"] ? <span className="font-bold text-green-600">{plates["5"]}</span> : <span className="text-white ">0</span>}
            </div>

            <div className="text-center font-mono" key={"2.5"}>
                {plates["2.5"] ? <span className="font-bold text-green-600">{plates["2.5"]}</span> : <span className="text-white ">0</span>}
            </div>

            <div className=" bg-gray-200/70 text-center font-mono" key={"2"}>
                {plates["2"] ? <span className="font-bold text-green-600">{plates["2"]}</span> : <span className="text-white ">0</span>}
            </div>

            <div className="text-center font-mono" key={"1.25"}>
                {plates["1.25"] ? (
                    <span className="font-bold text-green-600">{plates["1.25"]}</span>
                ) : (
                    <span className="text-white">0</span>
                )}
            </div>

            <div className=" bg-gray-200/70 text-center font-mono" key={"0.5"}>
                {plates["0.5"] ? <span className="font-bold text-green-600">{plates["0.5"]}</span> : <span className="text-white">0</span>}
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
