import { useContext, useMemo } from "react";
import { PlatesContext } from "../views/App";

const usePlates = () => {
    const plates = useContext(PlatesContext);

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
