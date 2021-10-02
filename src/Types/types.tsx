export type Translation = {
    eng: string;
    rus: string;
    [index: string]: string;
};

export type Word = Translation & {
    key: string;
};