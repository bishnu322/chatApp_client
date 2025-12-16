import { Input } from "../../shared/design/Input";
import HomePageContainer from "../HomePageContainer";
import { stringData } from "../../string";
import Button from "../../shared/design/Button";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link } from "react-router-dom";

const { signUp } = stringData;

type FormValues = {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormValues>();

  const signUpHandler = async (data: FormValues) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/signup",
        data
      );

      return response.data;
    } catch (error) {
      console.log("Something went wrong!", error);
    }
  };

  const onSubmit = (data: FormValues) => {
    if (!data.email || !data.password || !data.userName)
      return alert("username, password and email fields cannot be empty!");

    signUpHandler(data);
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

        <div className="mt-2 mb-4">
          <Button type="submit">
            {isSubmitting
              ? `${stringData.button.signUpButton.submitting}`
              : `${stringData.button.signUpButton.signUp}`}
          </Button>
        </div>

        <Link
          to={"/"}
          className="text-blue-500 text-sm cursor-pointer text-center underline"
        >
          {stringData.login.link}
        </Link>
      </form>
    </HomePageContainer>
  );
};

export default SignUp;
