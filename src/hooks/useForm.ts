import { ChangeEvent, useState } from "react";
import { LoginValidation, RegisterValidation } from "@utils/validate";
import { UserChangePasswordData, UserLoginData, UserRegisterData } from "@type/user";

type useFormProps<FormType> = {
  initValues: FormType;
  onSubmit: (values: FormType) => void;
  validate: any;
};

type responseData = {
  success: false;
  error: string;
  message: string;
};

const useForm = <FormType>({ initValues, onSubmit, validate }: useFormProps<FormType>) => {
  const [values, setValues] = useState<FormType>(initValues);
  const [errors, setErrors] = useState<FormType>(initValues);
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    setLoading(true);

    const newErrors = validate ? validate(values) : {};
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      await onSubmit(values);
    }

    setLoading(false);
  };

  const interpretMessage = (msg: responseData) => {
    const errorData: any = {};

    if (!msg.success) {
      errorData[msg.error] = msg.message;

      setErrors(errorData);
    } else {
      setErrors(errorData);
    }
  };

  return {
    values,
    setValues,
    errors,
    isLoading,
    handleChange,
    handleSubmit,
    interpretMessage,
  };
};

export default useForm;
