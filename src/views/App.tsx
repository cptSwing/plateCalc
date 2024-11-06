import { useState } from "react";
import PerWeightImplement, { ImplementEnum } from "../components/PerWeightImplement";
import WeightInput from "../components/WeightInput";
import WeightSplit from "../components/WeightSplit";
import WhichPlates from "../components/WhichPlates";

const App = () => {
    const targetWeightState = useState<number | null>(null);

    return (
        <div className="mx-auto w-full min-w-52 p-2 text-xs sm:p-2 sm:py-6 sm:text-sm md:w-4/5 md:text-base xl:w-3/5">
            {/* Grid / Table */}
            <div className="mb-4 grid grid-cols-8 rounded-md border-2 border-gray-300 bg-gray-300 shadow-md sm:grid-cols-10">
                {/* Grid labels */}
                <div className="col-span-2 border-b-2 border-l border-gray-300 bg-gray-100 p-1 text-center">Gear</div>
                <div className="col-span-1 border-b-2 border-l border-gray-300 bg-gray-100 p-1 text-center sm:col-span-2">
                    Add kg / side
                </div>
                <div className="col-span-4 border-b-2 border-l border-gray-300 bg-gray-100 p-1 text-center">Plates to add / side</div>
                <div className="col-span-1 border-b-2 border-l border-gray-300 bg-gray-100 p-1 text-center sm:col-span-2">Closest</div>

                {/* Grid Data */}
                <PerWeightImplement targetWeightState={targetWeightState} implement={ImplementEnum["Trapbar"]} />
                <PerWeightImplement targetWeightState={targetWeightState} implement={ImplementEnum["Barbell"]} />
                <PerWeightImplement targetWeightState={targetWeightState} implement={ImplementEnum["EzBar"]} />
                <PerWeightImplement targetWeightState={targetWeightState} implement={ImplementEnum["Dumbbell"]} />
                <PerWeightImplement targetWeightState={targetWeightState} implement={ImplementEnum["2 Dumbbells"]} />

                {/* Plates Symbols below */}
                <div className="col-span-4 col-start-4 grid w-full grid-cols-7 border-l bg-gray-300 text-2xs sm:col-start-5 sm:text-xs lg:text-sm">
                    <div className="flex w-full items-center justify-center bg-gray-100 py-2">
                        <div className="flex aspect-square w-4/5 items-center justify-center rounded-full border border-gray-500 bg-gray-300 text-gray-700">
                            15
                        </div>
                    </div>
                    <div className="flex w-full items-center justify-center py-2">
                        <div className="flex aspect-square w-4/5 items-center justify-center rounded-full border border-gray-500 bg-gray-300 text-gray-700">
                            10
                        </div>
                    </div>
                    <div className="flex w-full items-center justify-center bg-gray-100 py-2">
                        <div className="flex aspect-square w-4/5 items-center justify-center rounded-full border border-gray-500 bg-gray-300 text-gray-700">
                            5
                        </div>
                    </div>
                    <div className="flex w-full items-center justify-center py-2">
                        <div className="flex aspect-square w-4/5 items-center justify-center rounded-full border border-gray-500 bg-gray-300 text-gray-700">
                            2.5
                        </div>
                    </div>
                    <div className="flex w-full items-center justify-center bg-gray-100 py-2">
                        <div className="flex aspect-square w-4/5 items-center justify-center rounded-full border border-gray-500 bg-gray-300 text-gray-700">
                            2
                        </div>
                    </div>
                    <div className="flex w-full items-center justify-center py-2">
                        <div className="flex aspect-square w-4/5 items-center justify-center rounded-full border border-gray-500 bg-gray-300 text-gray-700">
                            1.25
                        </div>
                    </div>
                    <div className="flex w-full items-center justify-center bg-gray-100 py-2">
                        <div className="flex aspect-square w-4/5 items-center justify-center rounded-full border border-gray-500 bg-gray-300 text-gray-700">
                            0.5
                        </div>
                    </div>
                </div>
                <div className="border-l" />
            </div>

            <div className="flex size-full flex-col items-center justify-between gap-2 sm:flex-row ">
                <WhichPlates />
                <WeightSplit targetWeightState={targetWeightState} />
                <WeightInput targetWeightState={targetWeightState} />
            </div>
        </div>
    );
};

export default App;
