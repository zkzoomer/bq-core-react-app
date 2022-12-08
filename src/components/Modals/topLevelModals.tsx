import { FC, ReactElement } from "react";

import { ErrorModal } from "./errorModal";

export const TopLevelModals: FC = (): ReactElement => {
    return(
        <ErrorModal />
    )
}