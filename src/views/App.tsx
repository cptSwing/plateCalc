import { useState } from "react";
import WeightInput from "../components/WeightInput";
import AvailablePlates from "../components/AvailablePlates";
import WeightGrid from "../components/WeightGrid";
import WarmupWeights from "../components/WarmupWeights";
import StrokeText from "../components/StrokeText";

const gridClassNames =
    "[--grid-bg:theme(colors.gray.200)] [--grid-gap-x:0] [--grid-gap-y:theme(spacing[0.5])] [--grid-padding:theme(spacing.1)] ";
const gridHeaderClassNames =
    "[--grid-header-bg:theme(colors.gray.500)] [--grid-header-text-color:theme(colors.gray.100)] [--grid-header-padding:theme(spacing.1)] ";
const gridElementClassNames =
    "sm:[--grid-element-padding-x:theme(spacing.4)] [--grid-element-padding-x:theme(spacing.2)] [--grid-element-bg-1:theme(colors.gray.400)] [--grid-element-bg-2:theme(colors.gray.300)] [--grid-element-text-color:theme(colors.gray.100)]";

const variableCssClassNames = gridClassNames + gridHeaderClassNames + gridElementClassNames;

const App = () => {
    const targetWeightState = useState<number | null>(null);

    return (
        <div
            className={`mx-auto mt-2 flex w-[calc(100%-theme(spacing.6))] flex-col gap-2 text-sm leading-relaxed text-slate-800 sm:w-[90%] md:w-5/6 md:leading-loose xl:w-3/5 ${variableCssClassNames}`}
        >
            <Logo />
            <WeightGrid targetWeightState={targetWeightState} />

            <div className="flex size-full flex-col items-center justify-between gap-2 sm:flex-row ">
                <WeightInput targetWeightState={targetWeightState} />
                <WarmupWeights targetWeightState={targetWeightState} />
                <AvailablePlates />
            </div>
        </div>
    );
};

export default App;

const Logo = () => {
    return (
        <StrokeText
            text="plateCalc"
            classNames="z-10 -mb-2 ml-1 text-4xl font-bold italic leading-none text-[--grid-bg] drop-shadow-sm"
            strokeWidth="0.2rem"
            strokeColor="#303846"
        />
    );
};
