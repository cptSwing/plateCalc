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
        <div className="group order-3 self-stretch rounded-md bg-[--element-bg] p-[--element-padding] shadow-md sm:order-2 sm:basis-1/3">
            <label
                className="block rounded-t-md bg-[--header-bg] p-[--header-padding] text-center font-semibold italic"
                htmlFor="weightValue"
            >
                Target Weight
            </label>
            <form className="flex items-center justify-between p-1" onSubmit={(e) => e.preventDefault()}>
                <input
                    className="w-2/5 min-w-9 rounded-sm py-1 text-center outline-4 outline-offset-1 outline-yellow-300/50 ring-[1px] ring-gray-500 group-hover:outline"
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
                    className="w-2/5 min-w-9 rounded-md border border-gray-500 bg-gray-200 p-1 text-gray-700 ring-gray-500/30 hover:bg-gray-400 active:border-blue-700 active:text-white active:ring"
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
