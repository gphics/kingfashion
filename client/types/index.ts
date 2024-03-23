export type galleryObjectType = {
    name: string;
    description: string;
    price: number;
    imgSrc: any;
    id: number;
};

export type imageType = {
    secure_url: string,
    public_id: string,

}
export type styleObjectType = {
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    price: number;
    categories: string[],
    images: imageType[]
    _id: string;
    __v: string;
};


export type resultType = {
    err: null | string,
    response: { data?: Object | Array<styleObjectType>, message?: string }
}

export interface stylesStateInterface {
    styles: styleObjectType[],
    recentStyles: galleryObjectType[],
    currentStyle: styleObjectType
}