import { getTags } from "@utils/apis/api/tag";
import dynamic from "next/dynamic";
import React from "react";
// import AsyncCreatableSelect from "react-select/async-creatable";
const AsyncCreatableSelect = dynamic(() => import("react-select/async-creatable"), { ssr: false });

export interface OptionType {
  readonly label: string;
  readonly value: string;
}

export type SelectorProps = {
  id?: string;
  value: readonly OptionType[];
  setValue: React.Dispatch<React.SetStateAction<readonly OptionType[]>>;
};

const Selector = ({ id, value, setValue }: SelectorProps) => {
  const [inputValue, setInputValue] = React.useState("");
  const [timer, setTimer] = React.useState<NodeJS.Timeout>();
  const tagOptions: OptionType[] = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
    { value: "태그", label: "태그" },
  ];

  const createOption = (label: string): OptionType => ({
    label,
    value: label,
  });

  const promiseOptions = async (inputValue: string) => {
    return new Promise<OptionType[]>(resolve => {
      clearTimeout(timer);

      const newTimer = setTimeout(async () => {
        const res = await getTags(inputValue);
        resolve(res.data.map((tg: any) => createOption(tg.tag)));
      }, 1000);

      setTimer(newTimer);
    });
  };

  const keyDownHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!inputValue) return;
    switch (event.key) {
      case " ":
      case "Enter":
      case "Tab":
        setValue(prev => [...prev, createOption(inputValue)]);
        setInputValue("");
        event.preventDefault();
    }
  };

  return (
    <AsyncCreatableSelect
      defaultOptions
      id={id}
      isClearable={false}
      placeholder=""
      inputValue={inputValue}
      isMulti
      onKeyDown={keyDownHandler}
      options={tagOptions}
      value={value}
      // onChange={(newValue) => setValue(newValue)}
      onInputChange={newValue => setInputValue(newValue)}
      formatCreateLabel={input => `"${input}"를 추가합니다.`}
      loadOptions={promiseOptions}
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          outline: "none",
          boxShadow: "none",
          borderColor: "var(--lightGreyColor)",
          "&:hover": "var(--lightGreyColor)",
        }),
        indicatorSeparator: (baseStyles, state) => ({
          ...baseStyles,
          background: "none",
        }),
        menu: (baseStyles, state) => ({
          ...baseStyles,
          fontSize: "0.75rem",
          fontWeight: "300",
        }),
      }}
    />
  );
};

export default Selector;
