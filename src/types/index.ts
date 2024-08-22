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
    _id: number;
    thumbnailUrl: string;
    title: string;
    publishingYear: number;
}

export type UserType = {
    email: string;
    password: string;
}