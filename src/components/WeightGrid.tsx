import { createContext } from "react";
import { ImplementsType } from "../types/plate-calculator";
import EditLocalStorage from "./EditLocalStorage";
import PlateDisplay from "./PlateDisplay";
import WeightImplement from "./WeightImplement";
import useLocalStorage from "../hooks/useLocalStorage";

const defaultImplements: ImplementsType = {
    "Trapbar": 16,
    "Barbell": 10,
    "EzBar": 7.5,
    "Dumbbell": 2,
    "2 Dumbbells": 2.5,
};

export const ImplementsContext = createContext(defaultImplements);

const WeightGrid = ({ targetWeightState }: { targetWeightState: [number | null, React.Dispatch<React.SetStateAction<number | null>>] }) => {
    const [implementsValue] = useLocalStorage("tools", defaultImplements);

    return (
        <div className="grid gap-px divide-red-400 rounded-md bg-[--element-bg] p-[--element-padding] shadow-md [grid-template-columns:0.9fr_0.5fr_1.3fr_0.3fr]">
            <ImplementsContext.Provider value={defaultImplements}>
                {/* Grid labels */}
                <GridLabels />

                {/* Grid Data */}
                {Object.entries(implementsValue).map((implementData, idx) => (
                    <WeightImplement
                        key={`${implementData[0]}_${idx}`}
                        targetWeightState={targetWeightState}
                        implementData={implementData as [keyof ImplementsType, number]}
                    />
                ))}
            </ImplementsContext.Provider>

            {/* Plates Symbols below */}
            <div className="col-start-3">
                <div className="grid w-full grid-cols-7 gap-px py-1 text-2xs sm:gap-0.5 sm:text-xs md:gap-1 md:text-sm lg:text-base">
                    <PlateDisplay />
                </div>
            </div>
        </div>
    );
};

export default WeightGrid;

const GridLabels = () => {
    return (
        <>
            <div className="rounded-tl-md bg-[--header-bg] p-[--header-padding] pt-[calc(var(--header-padding)+0.333rem)] text-center font-semibold italic leading-loose sm:pt-[calc(var(--header-padding)+0.25rem)] md:pt-[calc(var(--header-padding))] ">
                Tool
                <EditLocalStorage
                    storageKey="tools"
                    defaultValue={defaultImplements}
                    classN="float-right aspect-square h-6 pt-px text-gray-700/60"
                    stepVal={0.5}
                    minVal={1}
                    description="Tool"
                    valueDescription="Weight (Kg)"
                />
            </div>
            <div className="bg-[--header-bg] p-[--header-padding] pt-[calc(var(--header-padding)+0.333rem)] text-center font-semibold italic leading-loose sm:pt-[calc(var(--header-padding)+0.25rem)] md:pt-[calc(var(--header-padding))] ">
                Add / side
            </div>
            <div className="bg-[--header-bg] p-[--header-padding] pt-[calc(var(--header-padding)+0.333rem)] text-center font-semibold italic leading-loose sm:pt-[calc(var(--header-padding)+0.25rem)] md:pt-[calc(var(--header-padding))] ">
                Add Plates / side
            </div>
            <div className="rounded-tr-md bg-[--header-bg] p-[--header-padding] pt-[calc(var(--header-padding)+0.333rem)] text-center font-semibold italic leading-loose sm:pt-[calc(var(--header-padding)+0.25rem)] md:pt-[calc(var(--header-padding))] ">
                Nearest
            </div>
        </>
    );
};
