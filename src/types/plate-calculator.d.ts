declare module "plate-calculator/lib/plateCalculator";

export enum ImplementEnum {
    "Trapbar",
    "Barbell",
    "EzBar",
    "Dumbbell",
    "2 Dumbbells",
}

export type ImplementsType = Record<keyof typeof ImplementEnum, number>;

export type RecordEntry<T> = Record<string, T>;

export type ImplementDataType = {
    implementType: string;
    implementWeight: ImplementEnum;
    implementSides: number;
    multipleImplements: boolean;
};
