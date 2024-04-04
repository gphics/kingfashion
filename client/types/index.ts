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
export type categoryType = {
    name: string,
    _id?: string;
    __v?: string;
    createdAt?: string;
    updatedAt?: string;
}
export type styleObjectType = {
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    price: number;
    categories: categoryType[] | string[],
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
    currentStyle: styleObjectType,
    cartItems: styleObjectType[],

}
export type profileType = {
    fullname: string,
    _id: string;
    createdAt: string;
    updatedAt: string;
    password: string;
    contact: Number;
    email: string
}
export interface mgtSliceState {
    login: { value: string },
    isLoading: boolean,
    allStyles: styleObjectType[],
    filteredStyles: styleObjectType[],
    currentStyle: styleObjectType,
    search: string,
    allCategories: categoryType[],
    categorySearch: string,
    currentCategory: categoryType,
    filteredCategories: categoryType[],
    profile: profileType
} 