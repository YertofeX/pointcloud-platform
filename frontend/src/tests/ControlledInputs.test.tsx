import { AutocompleteOption } from "@api/types";
import {
  ControlledAutocomplete,
  ControlledError,
  ControlledTextField,
} from "@components/ControlledForm";
import { ControlledColor } from "@components/ControlledForm/ControlledColor";
import { render, renderHook } from "@testing-library/react";
import { FormProvider, useForm } from "react-hook-form";

vi.mock("mui-color-input", () => ({
  MuiColorInput: () => <input type="color" />,
}));

describe("ControlledInputs", () => {
  describe("ControlledTextField", () => {
    it("should render the ControlledTextField component", () => {
      type FormParams = {
        test: string;
      };

      const {
        result: { current: form },
      } = renderHook(() =>
        useForm<FormParams>({
          defaultValues: {
            test: "",
          },
        })
      );

      render(
        <FormProvider {...form}>
          <form>
            <ControlledTextField label="test" name="test" />
          </form>
        </FormProvider>
      );
    });
    it("should render the ControlledTextField component with the 'multiline' prop", () => {
      type FormParams = {
        testDescription: string;
      };

      const {
        result: { current: form },
      } = renderHook(() =>
        useForm<FormParams>({
          defaultValues: {
            testDescription: "",
          },
        })
      );

      render(
        <FormProvider {...form}>
          <form>
            <ControlledTextField
              label="testDescription"
              name="testDescription"
              multiline
            />
          </form>
        </FormProvider>
      );
    });
  });
  describe("ControlledAutoComplete", () => {
    it("should render the ControlledAutocomplete component", () => {
      type FormParams = {
        test: AutocompleteOption | null;
      };

      const {
        result: { current: form },
      } = renderHook(() =>
        useForm<FormParams>({
          defaultValues: {
            test: null,
          },
        })
      );

      render(
        <FormProvider {...form}>
          <form>
            <ControlledAutocomplete label="test" name="test" options={[]} />
          </form>
        </FormProvider>
      );
    });
    it("should render the ControlledAutocomplete component with options", () => {
      type FormParams = {
        test: AutocompleteOption | null;
      };

      const {
        result: { current: form },
      } = renderHook(() =>
        useForm<FormParams>({
          defaultValues: {
            test: null,
          },
        })
      );

      render(
        <FormProvider {...form}>
          <form>
            <ControlledAutocomplete
              label="test"
              name="test"
              options={[
                { label: "test0", value: 0 },
                { label: "test1", value: 1 },
              ]}
            />
          </form>
        </FormProvider>
      );
    });
  });
  describe("ControlledColor", () => {
    it("should render the ControlledColor component", () => {
      type FormParams = {
        color: string;
      };

      const {
        result: { current: form },
      } = renderHook(() =>
        useForm<FormParams>({
          defaultValues: {
            color: "#FFFFFF",
          },
        })
      );

      render(
        <FormProvider {...form}>
          <form>
            <ControlledColor label="test" name="test" />
          </form>
        </FormProvider>
      );
    });
  });
  describe("ControlledError", () => {
    it("should render the ControlledError component", () => {
      type FormParams = {
        color: string;
      };

      const {
        result: { current: form },
      } = renderHook(() =>
        useForm<FormParams>({
          defaultValues: {
            color: "#FFFFFF",
          },
        })
      );

      render(
        <FormProvider {...form}>
          <form>
            <ControlledError />
          </form>
        </FormProvider>
      );
    });
  });
});
