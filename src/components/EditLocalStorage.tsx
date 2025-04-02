import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { Dispatch, FC, Fragment, SetStateAction, useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

interface EditLocalStorageType {
    storageKey: string;
    defaultValue: Record<string, number> | Record<number, number>;
    classN: string;
    stepVal: number;
    minVal: number;
    description: string;
    valueDescription: string;
}

const EditLocalStorage = ({
    storageKey,
    defaultValue,
    classN,
    stepVal,
    minVal,
    description,
    valueDescription,
}: EditLocalStorageType): JSX.Element => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    return (
        <>
            <PencilSquareIcon
                className={`${classN} float-right aspect-square h-6 cursor-pointer pt-px text-gray-700/60 hover:text-gray-400 active:text-gray-300`}
                onClick={(ev) => setModalIsOpen(true)}
            />

            {modalIsOpen && (
                <Modal
                    setModalIsOpen={setModalIsOpen}
                    storageKey={storageKey}
                    defaultValue={defaultValue}
                    stepVal={stepVal}
                    description={description}
                    valueDescription={valueDescription}
                    minVal={minVal}
                />
            )}
        </>
    );
};

export default EditLocalStorage;

const Modal: FC<{
    setModalIsOpen: (value: SetStateAction<boolean>) => void;
    storageKey: string;
    defaultValue: Record<string, number> | Record<number, number>;
    stepVal: number;
    minVal: number;
    description: string;
    valueDescription: string;
}> = ({ setModalIsOpen, storageKey, defaultValue, stepVal, minVal, description, valueDescription }) => {
    const [value, setValue] = useLocalStorage<Record<number, number>>(storageKey, defaultValue);

    return (
        <div className="fixed bottom-0 left-0 right-0 top-0 z-50 flex flex-col items-center justify-center bg-gray-800/50 not-italic">
            <div className="max-h-[90%] max-w-[90%] rounded-md bg-gray-400 shadow-xl md:max-h-[50%] md:max-w-[50%]">
                <div className="mb-4 flex flex-row items-center justify-between rounded-t-md bg-[--header-bg] p-[--header-padding] text-[--header-text]">
                    <span
                        className="cursor-pointer rounded-sm rounded-tl-md border border-gray-300 px-2 hover:bg-gray-400 hover:text-white active:bg-gray-400 active:text-white"
                        onClick={() => setValue(defaultValue)}
                    >
                        Set Default
                    </span>

                    <span className="text-lg capitalize">{storageKey}</span>

                    <span
                        className="cursor-pointer rounded-sm rounded-tr-md border border-gray-300 px-2 hover:bg-gray-400 hover:text-white active:bg-gray-400 active:text-white"
                        onClick={() => setModalIsOpen(false)}
                    >
                        Close
                    </span>
                </div>
                <div className="mx-auto grid min-w-[75%] grid-cols-4 gap-y-2 p-4 pt-0 text-white">
                    <div className="text-italic px-4 text-left underline">{description}</div>
                    <div className="text-italic underline">{valueDescription}</div>
                    <div className="text-italic px-4 text-left underline">{description}</div>
                    <div className="text-italic underline">{valueDescription}</div>
                    <ModalEntries lsValue={value} setLsValue={setValue} stepVal={stepVal} minVal={minVal} />
                </div>
            </div>
        </div>
    );
};

const ModalEntries: FC<{
    lsValue: Record<number, number> | null;
    setLsValue: (value: Record<number, number> | ((value: Record<number, number>) => Record<number, number>)) => void;
    stepVal: number;
    minVal: number;
}> = ({ lsValue, setLsValue, stepVal, minVal }) => {
    return Object.entries(lsValue as Record<string, number>).map(([key, val], idx) => {
        return (
            <Fragment key={`${key}_${val}_${idx}`}>
                <span className="inline-block text-nowrap px-4 text-left">{key}</span>
                <input
                    type="number"
                    name={`${key}_${val}_input`}
                    defaultValue={val}
                    className="mx-auto inline-block w-3/4 text-right text-black invalid:bg-red-400"
                    step={stepVal}
                    min={minVal}
                    onInput={(ev) => {
                        const thisElem = ev.target as HTMLInputElement;
                        if (thisElem.checkValidity()) {
                            setLsValue((current: Record<number, number>) => ({
                                ...current,
                                [key]: parseInt(thisElem.value),
                            }));
                        }
                    }}
                />
            </Fragment>
        );
    });
};
