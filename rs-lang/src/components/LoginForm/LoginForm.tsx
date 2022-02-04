import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import closeIcon from "../../assets/svg/close.svg";
import { SuccessfulLogin, UserDto } from "../../interfaces/user";
import { loginUser } from "../../utils/WebClients";
import CustomInput from "../CustomInput/CustomInput";
import LoaderButton from "../LoaderButton/LoaderButton";
import { updateUserInfo } from "./loginSlice";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();

  const history = useHistory();

  // TODO: figure out where to store JWT token
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user: UserDto = { email, password };

    loginUser(user)
      .then((res: SuccessfulLogin) => {
        alert("Успех! Вы будете перенаправлены на главную страницу!");
        // console.log(res);
        dispatch(updateUserInfo(res));
        setTimeout(() => history.push("/"), 3000);
      })
      .catch((err) => {
        switch (err.message) {
          case "403":
            console.log("Пользователь с таким имейлом уже существует!");
            break;
          default:
            console.log(
              "Произошла ошибка при входе! Пожалуйста, попробуй ещё раз."
            );
            break;
        }
      });
  };

  return (
    <div className="login-container relative rounded bg-gray-700 w-96 h-96 px-11">
      <Link to="/" className="absolute text-gray-200 top-4 right-4">
        <img src={closeIcon} alt="close" />
      </Link>
      <form
        className="login flex flex-col items-center justify-center border-b-2 border-gray-400 pt-9 pb-6"
        onSubmit={handleSubmit}
      >
        <h4 className="text-lg font-bold text-gray-200 tracking-wide mb-6">
          Вход в RSLANG
        </h4>
        <CustomInput
          id="loginEmail"
          type="email"
          placeholder="Укажите адрес эл. почты"
          required
          value={email}
          onChange={(e: Event) =>
            setEmail((e.target as HTMLInputElement).value)
          }
        />
        <CustomInput
          id="loginPassword"
          type="password"
          placeholder="Введите пароль"
          required
          value={password}
          onChange={(e: Event) =>
            setPassword((e.target as HTMLInputElement).value)
          }
        />
        <LoaderButton
          type="submit"
          className="btn_login w-full mt-4 bg-green-700 hover:bg-green-600 transition-colors text-white leading-6 font-bold py-2 px-4"
          isLoading={false}
          disabled={false}
        >
          Войти
        </LoaderButton>
      </form>
      <Link
        to="/signup"
        className="text-green-500 hover:text-green-400 transition-colors block text-center text-xs tracking-wide mx-auto mt-6"
      >
        Зарегистрировать аккаунт
      </Link>
    </div>
  );
}
