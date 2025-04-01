import EditLocalStorage from "./EditLocalStorage";
import PlateDisplay from "./PlateDisplay";
import usePlates, { defaultPlates } from "../hooks/usePlates";

const WhichPlates = () => {
    const plates = usePlates();

    return (
        <div className="order-1 flex flex-col items-center justify-start self-stretch rounded-md bg-[--element-bg] p-[--element-padding] shadow-md sm:basis-1/3 ">
            <div className="w-full rounded-t-md bg-[--header-bg] p-[--header-padding] text-center font-semibold italic">
                Available Plates
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

            <div className="grid w-full grid-cols-7 gap-x-6 gap-y-2 p-1 text-lg sm:gap-x-1 sm:gap-y-2 sm:pt-1.5 sm:text-xs lg:text-sm">
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

export default WhichPlates;
