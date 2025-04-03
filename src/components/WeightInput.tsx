import { FormEvent, FormEventHandler, useEffect, useRef, useState } from "react";
import { isNumber } from "./WarmupWeights";

const WeightInput = ({
    targetWeightState,
}: {
    targetWeightState: [number | null, React.Dispatch<React.SetStateAction<number | null>>];
}) => {
    const [targetWeight, setTargetWeight] = targetWeightState;
    const [weightTempVal, setWeightTempVal] = useState(returnValidTargetInputOrZero(targetWeight) ? (targetWeight as number) : 0);

    useEffect(() => {
        setTargetWeight(weightTempVal);
    }, [weightTempVal]);

    return (
        <div className="my-2 self-stretch rounded-md bg-[--element-bg] p-[--element-padding] shadow-lg outline outline-2 outline-offset-2 outline-green-500/50 sm:order-2 sm:my-0 sm:basis-1/3">
            <label
                className="block rounded-t-md bg-[--header-bg] p-[--header-padding] text-center font-semibold italic shadow-sm"
                htmlFor="weightValue"
            >
                Total Target Weight
            </label>
            <form
                className="flex flex-row items-center justify-between gap-1.5 p-1 sm:flex-col sm:pt-1.5"
                onSubmit={(ev) => {
                    ev.preventDefault();
                    const recast = (ev.target as HTMLFormElement).children[0] as HTMLInputElement;
                    setWeightTempVal(returnValidTargetInputOrZero(parseFloat(recast.value)));
                }}
            >
                <input
                    className="w-1/2 rounded-md border border-green-600 py-1 text-center font-semibold focus:border-green-400 sm:w-[calc(100%-2px)]"
                    type="number"
                    step={0.5}
                    min={0}
                    id="weightValue"
                    name="weightValue"
                    defaultValue={weightTempVal}
                />

                <button
                    className="w-1/2 rounded-md border border-gray-500 bg-green-400 py-1 font-semibold text-gray-100 hover:border-green-300 hover:bg-green-600 hover:text-white active:border-green-400 active:bg-green-800 active:text-white sm:w-full"
                    type="submit"
                >
                    Calculate
                </button>
            </form>
        </div>
    );
};

export default WeightInput;

const returnValidTargetInputOrZero = (input: any) => (isNumber(input) ? input : 0);
