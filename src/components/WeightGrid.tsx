import { PencilSquareIcon } from "@heroicons/react/24/solid";
import PlateDisplay from "./PlateDisplay";
import WeightImplement, { ImplementEnum } from "./WeightImplement";

const WeightGrid = ({ targetWeightState }: { targetWeightState: [number | null, React.Dispatch<React.SetStateAction<number | null>>] }) => {
    return (
        <div className="grid gap-px divide-red-400 rounded-md bg-[--element-bg] p-[--element-padding] shadow-md [grid-template-columns:0.75fr_0.5fr_1fr_0.333fr]">
            {/* Grid labels */}
            <GridLabels />

            {/* Grid Data */}
            <WeightImplement targetWeightState={targetWeightState} implement={ImplementEnum["Trapbar"]} />
            <WeightImplement targetWeightState={targetWeightState} implement={ImplementEnum["Barbell"]} />
            <WeightImplement targetWeightState={targetWeightState} implement={ImplementEnum["EzBar"]} />
            <WeightImplement targetWeightState={targetWeightState} implement={ImplementEnum["Dumbbell"]} />
            <WeightImplement targetWeightState={targetWeightState} implement={ImplementEnum["2 Dumbbells"]} />

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
            <div className="relative rounded-tl-md bg-[--header-bg] p-[--header-padding] pt-[calc(var(--header-padding)+1rem)] text-center font-semibold italic sm:pt-[calc(var(--header-padding)+0.25rem)] md:pt-[calc(var(--header-padding))]">
                Tool
                <PencilSquareIcon className="absolute -right-2 top-0 aspect-square h-full pb-1 pt-4 text-gray-700/80 sm:-right-0.5 sm:py-1.5 md:py-1.5 lg:right-0 lg:py-2" />
            </div>
            <div className="bg-[--header-bg] p-[--header-padding] pt-[calc(var(--header-padding)+1rem)] text-center font-semibold italic sm:pt-[calc(var(--header-padding)+0.25rem)] md:pt-[calc(var(--header-padding))]">
                Add kg / side
            </div>
            <div className="bg-[--header-bg] p-[--header-padding] pt-[calc(var(--header-padding)+1rem)] text-center font-semibold italic sm:pt-[calc(var(--header-padding)+0.25rem)] md:pt-[calc(var(--header-padding))]">
                Add Plates / side
            </div>
            <div className="rounded-tr-md bg-[--header-bg] p-[--header-padding] pt-[calc(var(--header-padding)+1rem)] text-center font-semibold italic sm:pt-[calc(var(--header-padding)+0.25rem)] md:pt-[calc(var(--header-padding))]">
                Nearest
            </div>
        </>
    );
};
