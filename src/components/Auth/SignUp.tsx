/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "../../shared/design/Input";
import HomePageContainer from "../HomePageContainer";

import { stringData } from "../../string";
import Button from "../../shared/design/Button";
import { useForm } from "react-hook-form";

const { signUp } = stringData;

type FormValues = {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUp = () => {
  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <HomePageContainer>
      <form className="flex flex-col gap-1" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label={signUp.userName.label}
          placeholder={signUp.userName.placeholder}
          id={signUp.userName.id}
          type={signUp.userName.type}
          {...register("userName")}
        />
        <Input
          label={signUp.email.label}
          placeholder={signUp.email.placeholder}
          id={signUp.email.id}
          type={signUp.email.type}
          {...register("email")}
        />

        <Input
          label={signUp.password.label}
          placeholder={signUp.password.placeholder}
          id={signUp.password.id}
          type={signUp.password.type}
          {...register("password")}
        />

        <Input
          label={signUp.confirmPassword.label}
          placeholder={signUp.confirmPassword.placeholder}
          id={signUp.confirmPassword.id}
          type={signUp.confirmPassword.type}
          {...register("confirmPassword")}
        />

        <div className="mt-2 mb-4">
          <Button type="submit">
            {/* {isSubmitting
            ? `${stringData.button.loginButton.submitting}`
            : `${stringData.button.loginButton.submit}`} */}
            Sign Up
          </Button>
        </div>
      </form>
    </HomePageContainer>
  );
};

export default SignUp;
