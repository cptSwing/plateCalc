import { PlateCountEnum } from "./PerWeightImplement";

const WhichPlates = () => {
    return (
        <div className="flex flex-col items-center justify-start rounded-md border-2 border-gray-300 bg-gray-300 shadow-md">
            <div className="col-span-7 h-fit w-full border-b-2 border-gray-300 bg-gray-200 p-1 text-center text-sm">Available Plates</div>

            <div className="grid grid-cols-7 gap-x-4 p-2">
                <div className="flex flex-col items-center justify-center">
                    <div className="flex aspect-square items-center justify-center whitespace-nowrap rounded-full border border-gray-500 bg-gray-400 py-1 text-xs text-gray-700">
                        15
                    </div>
                    <div className="text-sm font-bold">{PlateCountEnum["_15"]}x</div>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <div className="flex aspect-square items-center justify-center whitespace-nowrap rounded-full border border-gray-500 bg-gray-200 py-1 text-xs text-gray-700">
                        10
                    </div>
                    <div className="text-sm font-bold">{PlateCountEnum["_10"]}x</div>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <div className="flex aspect-square items-center justify-center whitespace-nowrap rounded-full border border-gray-500 bg-gray-400 py-1 text-xs text-gray-700">
                        5
                    </div>
                    <div className="text-sm font-bold">{PlateCountEnum["_5"]}x</div>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <div className="flex aspect-square items-center justify-center whitespace-nowrap rounded-full border border-gray-500 bg-gray-200 py-1 text-xs text-gray-700">
                        2.5
                    </div>
                    <div className="text-sm font-bold">{PlateCountEnum["_2.5"]}x</div>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <div className="flex aspect-square items-center justify-center whitespace-nowrap rounded-full border border-gray-500 bg-gray-400 py-1 text-xs text-gray-700">
                        2
                    </div>
                    <div className="text-sm font-bold">{PlateCountEnum["_2"]}x</div>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <div className="flex aspect-square items-center justify-center whitespace-nowrap rounded-full border border-gray-500 bg-gray-200 py-1 text-xs text-gray-700">
                        1.25
                    </div>
                    <div className="text-sm font-bold">{PlateCountEnum["_1.25"]}x</div>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <div className="flex aspect-square items-center justify-center whitespace-nowrap rounded-full border border-gray-500 bg-gray-400 py-1 text-xs text-gray-700">
                        0.5
                    </div>
                    <div className="text-sm font-bold">{PlateCountEnum["_0.5"]}x</div>
                </div>
            </div>
        </div>
    );
};

export default WhichPlates;
