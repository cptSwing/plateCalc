import PlateDisplay from "./PlateDisplay";
import { PlateCountEnum } from "./WeightImplement";
import { PencilSquareIcon } from "@heroicons/react/24/solid";

const WhichPlates = () => {
    return (
        <div className="order-1 flex flex-col items-center justify-start self-stretch rounded-md bg-[--element-bg] p-[--element-padding] shadow-md sm:basis-1/3 ">
            <div className="relative w-full rounded-t-md bg-[--header-bg] p-[--header-padding] text-center font-semibold italic">
                Available Plates
                <PencilSquareIcon className="absolute right-0 top-0 aspect-square h-full p-0.5 text-gray-700/80 sm:py-1 md:py-1.5 lg:py-2" />
            </div>

            <div className="grid w-full grid-cols-7 gap-x-6 gap-y-2 p-1 text-lg sm:gap-x-1 sm:gap-y-2 sm:pt-1.5 sm:text-xs lg:text-sm">
                <PlateDisplay />

                <div className="flex items-center justify-center text-sm">{PlateCountEnum["_15"]}</div>
                <div className="flex items-center justify-center text-sm">{PlateCountEnum["_10"]}</div>
                <div className="flex items-center justify-center text-sm">{PlateCountEnum["_5"]}</div>
                <div className="flex items-center justify-center text-sm">{PlateCountEnum["_2.5"]}</div>
                <div className="flex items-center justify-center text-sm">{PlateCountEnum["_2"]}</div>
                <div className="flex items-center justify-center text-sm">{PlateCountEnum["_1.25"]}</div>
                <div className="flex items-center justify-center text-sm">{PlateCountEnum["_0.5"]}</div>
            </div>
        </div>
    );
};

export default WhichPlates;
