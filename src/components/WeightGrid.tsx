import { BarsType } from "../types/plate-calculator";
import EditLocalStorage from "./EditLocalStorage";
import PlateDisplay from "./PlateDisplay";
import WeightBar from "./WeightBar";
import useLocalStorage from "../hooks/useLocalStorage";

const defaultBars: BarsType = {
    "Trapbar": 16,
    "Barbell": 10,
    "EzBar": 7.5,
    "1 Dumbbell": 2,
    "2 Dumbbells": 2.5,
};

const WeightGrid = ({ targetWeightState }: { targetWeightState: [number | null, React.Dispatch<React.SetStateAction<number | null>>] }) => {
    const [barsValue] = useLocalStorage("tools", defaultBars);

    return (
        <div className="sm:grid-template-desktop grid-template-mobile grid gap-px rounded-md bg-[--element-bg] p-[--element-padding] shadow-lg">
            {/* Grid labels */}
            <GridLabels />

            {/* Grid Data */}
            {Object.entries(barsValue).map((barData, idx) => (
                <WeightBar
                    key={`${barData[0]}_${idx}`}
                    row={idx + 1}
                    targetWeightState={targetWeightState}
                    barData={barData as [keyof BarsType, number]}
                />
            ))}

            {/* Plates Symbols below */}
            <div className="grid-footer-plates">
                <div className="grid w-full grid-cols-7 gap-0.5 py-1 text-xs sm:gap-0.5 md:gap-1 md:text-sm lg:text-lg">
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
            <div className="grid-header-bar rounded-tl-md bg-[--header-bg] p-[--header-padding] pt-[calc(var(--header-padding)+0.333rem)] text-center font-semibold italic leading-loose shadow-sm sm:pt-[calc(var(--header-padding)+0.25rem)] md:pt-[calc(var(--header-padding))] ">
                Bar
                <EditLocalStorage
                    storageKey="tools"
                    defaultValue={defaultBars}
                    classN="float-right aspect-square h-6 pt-px text-gray-700/60"
                    stepVal={0.5}
                    minVal={1}
                    description="Tool"
                    valueDescription="Weight (Kg)"
                />
            </div>

            <div className="grid-header-nearest rounded-tr-md bg-[--header-bg] p-[--header-padding] pt-[calc(var(--header-padding)+0.333rem)] text-center font-semibold italic leading-loose shadow-sm sm:rounded-none sm:pt-[calc(var(--header-padding)+0.25rem)] md:pt-[calc(var(--header-padding))] ">
                Nearest Result
            </div>

            <div className="grid-header-plate-per-side bg-[--header-bg] p-[--header-padding] pt-[calc(var(--header-padding)+0.333rem)] text-center font-semibold italic leading-loose shadow-sm sm:pt-[calc(var(--header-padding)+0.25rem)] md:pt-[calc(var(--header-padding))] ">
                Plates / Side
            </div>

            <div className="grid-header-kg-per-side bg-[--header-bg] p-[--header-padding] pt-[calc(var(--header-padding)+0.333rem)] text-center font-semibold italic leading-loose shadow-sm sm:rounded-tr-md sm:pt-[calc(var(--header-padding)+0.25rem)] md:pt-[calc(var(--header-padding))] ">
                Added Kg / Side
            </div>
        </>
    );
};
