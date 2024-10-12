declare type SearchParamProps = {
    params: { [key: string]: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

// ========================================

declare type SignUpParams = {
    firstName: string;
    lastName: string;
    city: string;
    state: string;
    postalCode: string;
    email: string;
    password: string;
    phone: string;

};

declare type LoginUser = {
    email: string;
    password: string;
};

declare type User = {
    $id: string;
    email: string;
    userId: string;
    firstName: string;
    lastName: string;
    name: string;
    city: string;
    state: string;
    postalCode: string;
    phone: string,
};
declare type NewUserParams = {
    userId: string;
    email: string;
    name: string;
    password: string;
};