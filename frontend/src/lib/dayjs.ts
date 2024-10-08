import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";

import "dayjs/locale/en";
import "dayjs/locale/hu";

dayjs.extend(localizedFormat);

const changeDayjsLocale = (newLocale: string) => {
  dayjs.locale(newLocale);
};

export { changeDayjsLocale, dayjs };
