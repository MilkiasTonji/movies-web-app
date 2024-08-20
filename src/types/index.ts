import { StaticImageData } from "next/image";

export type TextInputType = {
    name: string;
    value: string;
    type: string;
    onchange: any;
}

export type ImageType = {
    src: StaticImageData;
    alt: string;
}

export type MovieType = {
    thumbnail: StaticImageData;
    title: string;
    year: number;
}
