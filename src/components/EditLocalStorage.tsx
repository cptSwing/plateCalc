import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { Dispatch, FC, SetStateAction, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

interface EditLocalStorageType {
    storageKey: string;
    defaultValue: Record<string, number> | Record<number, number>;
    classN: string;
}

const EditLocalStorage = ({ storageKey, defaultValue, classN }: EditLocalStorageType): JSX.Element => {
    const localStorageValueState = useLocalStorage<Record<number, number>>(storageKey, defaultValue);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    return (
        <>
            <PencilSquareIcon
                className={`${classN} cursor-pointer`}
                onClick={(ev) => {
                    console.log("%c[EditLocalStorage]", "color: #30891b", `ev, storageKey :`, ev, storageKey);

                    setModalIsOpen(true);
                }}
            />

            {modalIsOpen && <Modal setModalIsOpen={setModalIsOpen} storageKey={storageKey} lsState={localStorageValueState} />}
        </>
    );
};

export default EditLocalStorage;

const Modal: FC<{
    setModalIsOpen: (value: SetStateAction<boolean>) => void;
    storageKey: string;
    lsState: [
        Record<number, number> | null,
        (value: Record<number, number> | ((value: Record<number, number>) => Record<number, number>)) => void,
    ];
}> = ({ setModalIsOpen, storageKey, lsState }) => {
    const [value, setValue] = lsState;

    return (
        <div className="fixed bottom-0 left-0 right-0 top-0 z-50 flex flex-col items-center justify-center bg-gray-800/50 not-italic text-white">
            <div className="max-h-[50%] max-w-[50%] rounded-md bg-gray-400 p-3">
                <div className="mb-4 flex flex-row items-center justify-between">
                    <span>Set Default</span>

                    <span className="text-lg capitalize">{storageKey}</span>
                    <span className="cursor-pointer" onClick={() => setModalIsOpen(false)}>
                        Close
                    </span>
                </div>
                <div className="mx-auto grid min-w-[75%] grid-cols-3 gap-y-2">
                    {Object.entries(value as Record<string, number>).map(([key, val], idx) => {
                        return (
                            <div key={key + idx} className="flex flex-row items-center justify-evenly">
                                <span className="inline-block w-1/4 text-right">{key}:</span>
                                <input
                                    type="number"
                                    defaultValue={val}
                                    className="inline-block w-1/4 text-right text-black"
                                    onInput={(ev) => {
                                        const incoming = parseInt((ev.target as HTMLInputElement).value);

                                        if (isValidPlateCount(incoming)) {
                                            setValue((current: Record<number, number>) => {
                                                console.log(
                                                    "%c[EditLocalStorage]",
                                                    "color: #cacdac",
                                                    `${key}:${incoming}; current :`,
                                                    current,
                                                );
                                                return {
                                                    ...current,
                                                    [key]: incoming,
                                                };
                                            });
                                        }
                                    }}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

const isValidPlateCount = (count: number) => count >= 2 && count % 2 === 0;
