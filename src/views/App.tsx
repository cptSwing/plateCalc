import { useState, useEffect } from "react";
import PerWeightImplement, { ImplementEnum } from "../components/PerWeightImplement";
import WeightInput from "../components/WeightInput";
import WeightSplit from "../components/WeightSplit";
import WhichPlates from "../components/WhichPlates";

const App = () => {
    const targetWeightState = useState<number | null>(null);

    /* First run: */
    useEffect(() => {
        navigator.serviceWorker.register(new URL("../service-worker.js", import.meta.url), { type: "module", scope: "." });
    }, []);

    return (
        <div className="mx-2 my-2 w-fit sm:mx-auto sm:my-6 sm:w-3/4 lg:w-3/5">
            <div>
                {/* Grid / Table */}
                <div className="mb-4 grid grid-cols-11 rounded-md border-2 border-gray-300 text-sm shadow-md">
                    {/* Grid labels */}
                    <div className="border-b-2 border-gray-300 bg-gray-200 p-1 text-center">Count</div>
                    <div className="col-span-2 border-b-2 border-l border-gray-300 bg-gray-200 p-1 text-center">Gear</div>
                    <div className="col-span-2 border-b-2 border-l border-gray-300 bg-gray-200 p-1 text-center">Add kg / side</div>
                    <div className="col-span-4 border-b-2 border-l border-gray-300 bg-gray-200 p-1 text-center">Plates to add</div>
                    <div className="col-span-2 border-b-2 border-l border-gray-300 bg-gray-200 p-1 text-center">Closest</div>

                    {/* Grid Data */}
                    <PerWeightImplement targetWeightState={targetWeightState} implement={ImplementEnum["TrapBar"]} />
                    <PerWeightImplement targetWeightState={targetWeightState} implement={ImplementEnum["BarBell"]} />
                    <PerWeightImplement targetWeightState={targetWeightState} implement={ImplementEnum["EzBar"]} />
                    <PerWeightImplement targetWeightState={targetWeightState} implement={ImplementEnum["DumbBell"]} />
                    <PerWeightImplement targetWeightState={targetWeightState} implement={ImplementEnum["DumbBells"]} />

                    {/* Plates Symbols below */}
                    <div className="col-span-4 col-start-6 grid w-full grid-cols-7 border-l text-xs">
                        <div className="flex w-full items-center justify-center bg-gray-100 py-2">
                            <div className="flex aspect-square w-4/5 items-center justify-center rounded-full border border-gray-500 bg-gray-300 text-gray-700">
                                0.5
                            </div>
                        </div>
                        <div className="flex w-full items-center justify-center py-2">
                            <div className="flex aspect-square w-4/5 items-center justify-center rounded-full border border-gray-500 bg-gray-300 text-gray-700">
                                1.25
                            </div>
                        </div>
                        <div className="flex w-full items-center justify-center bg-gray-100 py-2">
                            <div className="flex aspect-square w-4/5 items-center justify-center rounded-full border border-gray-500 bg-gray-300 text-gray-700">
                                2
                            </div>
                        </div>
                        <div className="flex w-full items-center justify-center py-2">
                            <div className="flex aspect-square w-4/5 items-center justify-center rounded-full border border-gray-500 bg-gray-300 text-gray-700">
                                2.5
                            </div>
                        </div>
                        <div className="flex w-full items-center justify-center bg-gray-100 py-2">
                            <div className="flex aspect-square w-4/5 items-center justify-center rounded-full border border-gray-500 bg-gray-300 text-gray-700">
                                5
                            </div>
                        </div>
                        <div className="flex w-full items-center justify-center py-2">
                            <div className="flex aspect-square w-4/5 items-center justify-center rounded-full border border-gray-500 bg-gray-300 text-gray-700">
                                10
                            </div>
                        </div>
                        <div className="flex w-full items-center justify-center bg-gray-100 py-2">
                            <div className="flex aspect-square w-4/5 items-center justify-center rounded-full border border-gray-500 bg-gray-300 text-gray-700">
                                15
                            </div>
                        </div>
                    </div>
                    <div className="border-l" />
                </div>
            </div>

            <div className="flex flex-row justify-between">
                <WeightInput targetWeightState={targetWeightState} />
                <WhichPlates />
                <WeightSplit targetWeightState={targetWeightState} />
            </div>
        </div>
    );
};

export default App;
