import EditLocalStorage from "./EditLocalStorage";
import PlateDisplay from "./PlateDisplay";
import usePlates, { defaultPlates } from "../hooks/usePlates";

const AvailablePlates = () => {
    const plates = usePlates();

    return (
        <div className="flex flex-col items-center justify-start self-stretch rounded-md bg-[--grid-bg] p-[--grid-padding] shadow-lg sm:order-3 sm:basis-[30%]">
            <div className="w-full rounded-t-md bg-[--grid-header-bg] p-[--grid-header-padding] text-center font-semibold text-[--grid-header-text-color]">
                Available Plates
                <EditLocalStorage
                    storageKey="plates"
                    defaultValue={defaultPlates}
                    classN="float-right h-6"
                    stepVal={2}
                    minVal={2}
                    description="Kg-Plate"
                    valueDescription="Count"
                />
            </div>

            <div className="grid w-full grid-cols-7 gap-x-6 p-1 text-base sm:gap-x-1 sm:gap-y-2 sm:py-4 sm:text-2xs md:text-xs lg:text-sm">
                <PlateDisplay />

                {plates.map(([plateType, count], idx) => (
                    <span key={`${plateType}_${count}` + idx} className="text-center text-sm font-semibold">
                        {count}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default AvailablePlates;
