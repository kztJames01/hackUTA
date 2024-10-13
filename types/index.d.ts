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

declare interface getUserInfoProps {
    userId: string;
}

declare interface PageWrapperProps {
    children: React.ReactNode;
}

declare interface PetProps{
    breed: string;
    url: string;
    sex: string;
 
}
declare interface RightSidebarProps {
    user: User | null;
    pets: PetProps[];
}

declare interface HeaderBoxProps {
    type: string;
    title: string;
    subtext: string;
    user: string;
}