declare module "plate-calculator/lib/plateCalculator";

export enum BarEnum {
    "Trapbar",
    "Barbell",
    "EzBar",
    "1 Dumbbell",
    "2 Dumbbells",
}

export type BarsType = Record<keyof typeof BarEnum, number>;

export type RecordEntry<T> = Record<string, T>;

export type BarDataType = {
    barType: string;
    barWeight: BarEnum;
    barSides: number;
    multipleBars: boolean;
};
