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
        <div className="plate-grid-template grid rounded-md bg-[--grid-bg] p-[--grid-padding] shadow-lg">
            {/* Grid labels */}
            <GridLabels />

            {/* Grid Data */}
            {Object.entries(barsValue).map((barData, idx) => (
                <WeightBar
                    key={`${barData[0]}_${idx}`}
                    gridRow={idx + 1}
                    targetWeightState={targetWeightState}
                    barData={barData as [keyof BarsType, number]}
                />
            ))}

            {/* Plates Symbols below */}
            <div className="grid-footer-plates">
                <div className="grid w-full grid-cols-7 gap-3 px-[--grid-element-padding-x] py-1 text-xs sm:gap-1 sm:px-0 md:gap-1.5 md:text-sm lg:text-base">
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
            <div className="grid-header-bar rounded-tl-md bg-[--grid-header-bg] p-[--grid-header-padding] px-[--grid-element-padding-x] font-semibold leading-loose text-[--grid-header-text-color]">
                Bar (kg)
                <EditLocalStorage
                    storageKey="tools"
                    defaultValue={defaultBars}
                    classN="h-6 pl-1 pb-1"
                    stepVal={0.5}
                    minVal={1}
                    description="Tool"
                    valueDescription="Weight (Kg)"
                />
            </div>

            <div className="grid-header-kg-per-side bg-[--grid-header-bg] p-[--grid-header-padding] px-[--grid-element-padding-x] text-right font-semibold leading-loose text-[--grid-header-text-color]">
                +Kg / Side
            </div>

            <div className="grid-header-closest rounded-tr-md bg-[--grid-header-bg] p-[--grid-header-padding] px-[--grid-element-padding-x] text-right font-semibold leading-loose text-[--grid-header-text-color] sm:rounded-none ">
                Closest (kg)
            </div>

            <div className="grid-header-plate-per-side bg-[--grid-header-bg] p-[--grid-header-padding] px-[--grid-element-padding-x] font-semibold leading-loose text-[--grid-header-text-color] sm:rounded-tr-md">
                Plates / Side
            </div>
        </>
    );
};
