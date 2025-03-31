import { useState } from "react";
import WeightInput from "../components/WeightInput";
import WeightSplit from "../components/WeightSplit";
import WhichPlates from "../components/WhichPlates";
import WeightGrid from "../components/WeightGrid";

const App = () => {
    const targetWeightState = useState<number | null>(null);

    return (
        <div className="mx-auto flex w-full min-w-52 flex-col gap-2 p-2 text-sm [--element-bg:theme(colors.gray.300)]  [--element-padding:theme(spacing.px)] [--grid-bg:theme(colors.gray.400)] [--grid-text:theme(colors.gray.100)] [--header-bg:theme(colors.gray.50)] [--header-padding:theme(spacing.1)] sm:text-base md:w-5/6 md:leading-relaxed lg:leading-loose xl:w-3/5">
            <Logo />

            <WeightGrid targetWeightState={targetWeightState} />

            <div className="flex size-full flex-col items-center justify-between gap-2 sm:flex-row ">
                <WhichPlates />
                <WeightSplit targetWeightState={targetWeightState} />
                <WeightInput targetWeightState={targetWeightState} />
            </div>
        </div>
    );
};

export default App;

const Logo = () => {
    return <div className="z-10 -mb-5 ml-1 text-4xl font-bold italic leading-none text-[--element-bg]">plateCalc</div>;
};
