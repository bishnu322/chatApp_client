import { Link } from "react-router-dom";
import Button from "../../shared/design/Button";
import { Input } from "../../shared/design/Input";
import { stringData } from "../../string";
import { useForm } from "react-hook-form";

const { login } = stringData;

type FormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormValues>();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      <Input
        label={login.email.label}
        placeholder={login.email.placeholder}
        id={login.email.id}
        type={login.email.type}
        {...register("email")}
      />

      <Input
        label={login.password.label}
        placeholder={login.password.placeholder}
        id={login.password.id}
        type={login.password.type}
        {...register("password")}
      />

      <div className="mt-2">
        <Button type="submit">
          {isSubmitting
            ? `${stringData.button.loginButton.submitting}`
            : `${stringData.button.loginButton.submit}`}
        </Button>
      </div>

      <Link
        to={"/signup"}
        className="text-blue-500 text-sm cursor-pointer text-center underline"
      >
        {stringData.signUp.link}
      </Link>
    </form>
  );
};

export default Login;
