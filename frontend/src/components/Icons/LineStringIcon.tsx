import { SvgIcon, SvgIconProps } from "@mui/material";

export const LineStringIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props}>
      <svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M86 18.5L13 42L65.5 82"
          stroke="currentColor"
          strokeWidth="8"
        />
        <circle cx="86" cy="19" r="13" fill="#41B346" />
        <circle cx="14" cy="43" r="13" fill="#41B346" />
        <circle cx="65" cy="81" r="13" fill="#41B346" />
      </svg>
    </SvgIcon>
  );
};
