Non-generic type

import { Popper as MuiPopper, PopperProps } from "@mui/material"

export const Popper = (props: PopperProps) => {
return <MuiPopper {...props} />
}

Generic type:

import { ElementType } from "react"
import { Portal as MuiPortal, PortalProps } from "@mui/material"

export const Portal = <C extends ElementType>(
props: PortalProps<C, { component?: C }>
) => {
return <MuiPortal {...props} />
}
