import React ,{FC , ReactNode} from "react";
import LayoutMLTemp from "@/components/machine-learning/layout-temp";
interface Props {
    children: ReactNode;
}
const Layout: FC<Props> = ({ children }) => {
    return <LayoutMLTemp>{children}</LayoutMLTemp>;
};
export default Layout