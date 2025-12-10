import { Link, useNavigate } from "react-router-dom";
import Button from "../../shared/design/Button";
import { Input } from "../../shared/design/Input";
import { stringData } from "../../string";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuthStore } from "../../shared/store/userStore";
// import { useAuthStore } from "../../shared/store/userStore";

const { login } = stringData;

type FormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormValues>();

  const loginHandler = async (data: FormValues) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        data,
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        setUser(response.data);
        navigate("/chat", { replace: true });
      }

      return response.data;
    } catch (error) {
      console.log("login failed", error);
    }
  };

  const onSubmit = (data: FormValues) => {
    if (!data.email || !data.password)
      return alert("Email and Password filed cannot be empty!");

    loginHandler(data);
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
