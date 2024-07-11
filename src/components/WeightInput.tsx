import { FormEvent, FormEventHandler, useRef, useState } from "react";
import { isNumber } from "./WeightSplit";

const WeightInput = ({
    targetWeightState,
}: {
    targetWeightState: [number | null, React.Dispatch<React.SetStateAction<number | null>>];
}) => {
    const [targetWeight, setTargetWeight] = targetWeightState;
    const [weightTempVal, setWeightTempVal] = useState(isNumber(targetWeight) ? (targetWeight as number) : 0);

    return (
        <div className="h-fit rounded-md border-2 border-gray-300 bg-gray-300 text-sm shadow-md">
            <label className="block border-b-2 border-gray-300 bg-gray-200 px-4 py-1" htmlFor="weightValue">
                Target Weight
            </label>
            <form className="flex items-center justify-between p-1" onSubmit={(e) => e.preventDefault()}>
                <input
                    className="h-full w-9 rounded-sm py-1 text-center ring-[1px] ring-gray-500"
                    type="text"
                    id="weightValue"
                    name="weightValue"
                    defaultValue={weightTempVal}
                    onInput={(e) => {
                        // @ts-expect-error yes it does
                        setWeightTempVal(parseFloat(e.target.value));
                    }}
                    onKeyUp={(e) => {
                        if (e.key === "Enter") {
                            setTargetWeight(weightTempVal);
                        }
                    }}
                />
                <button
                    className="rounded-md border border-gray-500 bg-gray-200 p-1 text-gray-700 ring-gray-500/30 hover:bg-gray-400 active:border-blue-700 active:text-white active:ring"
                    type="button"
                    onClick={() => {
                        setTargetWeight(weightTempVal);
                    }}
                >
                    Calculate
                </button>
            </form>
        </div>
    );
};

export default WeightInput;
