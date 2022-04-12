import Menu from "./menu";
import MenuItem from "./menu-item";
import SubMenu from "./sub-menu";

type MenuType = typeof Menu & {
  SubMenu: typeof SubMenu;
  MenuItem: typeof MenuItem;
}
const ExportMenu = Menu as MenuType;

ExportMenu.SubMenu = SubMenu;
ExportMenu.MenuItem = MenuItem;
