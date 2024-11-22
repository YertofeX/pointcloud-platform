import { Dayjs, isDayjs } from "dayjs";
import * as yup from "yup";

type AnyPresentValue = {};

declare module "yup" {
  interface StringSchema {
    phoneNumber(): this;
    surveyName(): this;
    projectName(): this;
    versionNumber(): this;
    section(): this;
    url(): this;
  }
  interface MixedSchema<
    TType extends yup.Maybe<AnyPresentValue>,
    TContext,
    TDefault,
    TFlags extends yup.Flags,
  > {
    dayjs(
      message?: yup.Message
    ): MixedSchema<Dayjs | undefined, TContext, TDefault, TFlags>;
    validDate(message?: yup.Message): this;
    geoJSON(message?: yup.Message): this;
  }
}

// #region Phone number schema
yup.addMethod(yup.string, "phoneNumber", function phoneNumber() {
  return this.matches(
    /^((\+\d{1,3}|06)[ \-/]?)?(\d{1,3}|\(\d{1,3}\))[ -]?\d{3}[ -]?\d{2}[ -]?\d{1,2}$/,
    "error.form.invalid_phone_number"
  );
});
// #endregion

// #region URL schema
yup.addMethod(yup.string, "url", function url() {
  return this.matches(
    /^((ftp:\/\/www\.|https:\/\/www\.|http:\/\/www\.|ftp:\/\/|https:\/\/|http:\/\/)[a-zA-Z0-9-]{2,}(\.[a-zA-Z0-9]{2,})*(\/[a-zA-Z0-9.#?=&%\-_]+)*\/?)?$/,
    "error.form.invalid_url"
  );
});
// #endregion

// #region Date schema
yup.addMethod(yup.mixed, "dayjs", function dayjs(message) {
  return this.test("dayjs", message, function validate(value) {
    if (!value) {
      return true;
    }
    return isDayjs(value);
  });
});

yup.addMethod(yup.mixed, "validDate", function validDate(message) {
  return this.test("validDate", message, function validate(value) {
    if (!value) {
      return true;
    }
    if (!isDayjs(value)) {
      return true;
    }
    return value.isValid();
  });
});
// #endregion

yup.setLocale({
  mixed: {
    default: "error.form.field_invalid",
    required: "error.form.field_required",
    notNull: "error.form.field_required",
    defined: "error.form.field_required",
  },
  string: {
    email: "error.form.email_format_invalid",
    max: "error.form.field_too_long",
    min: "error.form.field_too_short",
  },
  boolean: {},
  number: {
    max: "error.form.field_too_big",
    min: "error.form.field_too_small",
  },
  array: {
    min: "error.form.too_few_items_in_list",
    max: "error.form.too_many_items_in_list",
  },
});

export { yup };
