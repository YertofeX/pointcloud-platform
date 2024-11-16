import { SvgIcon, SvgIconProps } from "@mui/material";

export const HeightIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props}>
      <svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_7610_7158)">
          <path
            d="M86.9424 14.0954L15.8345 84.8479"
            stroke="currentColor"
            strokeWidth="8"
          />
          <path
            d="M86.1455 12.2518L86.1483 94.2056"
            stroke="#41B346"
            strokeWidth="8"
            strokeDasharray="16 16"
          />
          <circle cx="86" cy="14.0954" r="14" fill="#41B346" />
          <circle cx="14" cy="86" r="14" fill="#41B346" />
          <circle cx="86" cy="86" r="14" fill="#41B346" />
        </g>
        <defs>
          <clipPath id="clip0_7610_7158">
            <rect width="100" height="100" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </SvgIcon>
  );
};
