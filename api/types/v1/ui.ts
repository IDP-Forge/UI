export type uiMenuItem = {
    url: string,
    title: string,
    submenu: Array<uiMenuItem>
}

export type adminSidebarMenu = Array<uiMenuItem>;
