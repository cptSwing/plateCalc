import { useMemo } from "react";
import useLocalStorage from "./useLocalStorage";

export const defaultPlates = {
    15: 2,
    10: 6,
    5: 8,
    2.5: 10,
    2: 4,
    1.25: 6,
    0.5: 8,
};

const usePlates = () => {
    const [plates] = useLocalStorage("plates", defaultPlates);

    const filteredPlates_Memo: [number, number][] = useMemo(
        () =>
            Object.entries(plates)
                .map(([keyStr, valNum]) => [parseFloat(keyStr), valNum] as [number, number])
                .sort((a, b) => b[0] - a[0]),
        [plates],
    );

    return filteredPlates_Memo;
};

export default usePlates;
