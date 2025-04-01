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
        <div className="order-3 self-stretch rounded-md bg-[--element-bg] p-[--element-padding] shadow-md sm:order-2 sm:basis-1/3">
            <label
                className="block rounded-t-md bg-[--header-bg] p-[--header-padding] text-center font-semibold italic"
                htmlFor="weightValue"
            >
                Target Weight
            </label>
            <form
                className="flex flex-row items-center justify-between gap-1.5 p-1 sm:flex-col sm:pt-1.5"
                onSubmit={(e) => e.preventDefault()}
            >
                <input
                    className="w-1/2 rounded-bl-sm py-1 text-center outline-4 outline-offset-1 outline-yellow-300/50 ring-[1px] ring-gray-500 hover:outline focus:outline sm:w-[calc(100%-2px)] sm:rounded-none"
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
                    className="w-1/2 rounded-br-md border border-gray-500/50 bg-gray-400 py-1 text-gray-200  ring-gray-500/30 hover:border-gray-500 hover:bg-gray-400 hover:ring-1 hover:ring-blue-700/50 active:text-white active:ring-2 sm:w-full sm:rounded-b-md sm:rounded-tr-none"
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
