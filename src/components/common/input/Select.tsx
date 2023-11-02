import styled from "styled-components";

export interface OptionType {
  readonly label: string;
  readonly value: string;
}

type SelectProps = {
  id?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: OptionType[];
};

const Select = ({ id, value, onChange, options }: SelectProps) => {
  return (
    <SelectStyled id={id} value={value} onChange={onChange}>
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </SelectStyled>
  );
};
export default Select;

const SelectStyled = styled.select`
  margin-bottom: 1rem;
  display: block;
  padding: 0.5rem 2rem 0.5rem 0.5rem;
  font-size: 1rem;
  line-height: 1.5;
  background-clip: padding-box;
  border: 1px solid #dcdcdc;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out;
`;
