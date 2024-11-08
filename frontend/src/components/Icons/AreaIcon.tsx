import { SvgIcon, SvgIconProps } from "@mui/material";

export const AreaIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props}>
      <svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_7608_44)">
          <path
            d="M13.5 60.5L35.5 11.5L86 40.5L68.5 88L13.5 60.5Z"
            stroke="currentColor"
            strokeWidth="8"
          />
          <circle cx="86" cy="41" r="13" fill="#41B346" />
          <circle cx="14" cy="60" r="13" fill="#41B346" />
          <circle cx="36" cy="14" r="13" fill="#41B346" />
          <circle cx="68" cy="86" r="13" fill="#41B346" />
        </g>
        <defs>
          <clipPath id="clip0_7608_44">
            <rect width="100" height="100" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </SvgIcon>
  );
};
