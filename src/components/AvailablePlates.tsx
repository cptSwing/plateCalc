import EditLocalStorage from "./EditLocalStorage";
import PlateDisplay from "./PlateDisplay";
import usePlates, { defaultPlates } from "../hooks/usePlates";

const AvailablePlates = () => {
    const plates = usePlates();

    return (
        <div className="flex flex-col items-center justify-start self-stretch rounded-md bg-[--element-bg] p-[--element-padding] shadow-lg sm:order-3 sm:basis-[30%]">
            <div className="w-full rounded-t-md bg-[--header-bg] p-[--header-padding] text-center font-semibold italic shadow-sm">
                Edit Plate-Set
                <EditLocalStorage
                    storageKey="plates"
                    defaultValue={defaultPlates}
                    classN=""
                    stepVal={2}
                    minVal={2}
                    description="Kg-Plate"
                    valueDescription="Count"
                />
            </div>

            <div className="grid w-full grid-cols-7 gap-x-6 p-1 text-base sm:gap-x-1 sm:gap-y-2 sm:py-4 sm:text-2xs md:text-xs lg:text-sm">
                <PlateDisplay />

                {plates.map(([plateType, count], idx) => (
                    <div key={`${plateType}_${count}` + idx} className="flex items-center justify-center text-sm">
                        {count}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AvailablePlates;
