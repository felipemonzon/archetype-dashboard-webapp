export interface MenuInfo {
    title: string;
    path?: string
    icon: string;
    id: number;
    children: MenuInfo[];
}