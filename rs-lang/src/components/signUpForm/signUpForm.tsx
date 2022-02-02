import LoaderButton from "../btn_type_loader/LoaderButton";
import closeIcon from "../../assets/svg/close.svg";
import CustomInput from "../CustomInput/CustomInput";
import { useState } from "react";
import { createUser } from "../../utils/WebClients";
import { useHistory } from "react-router-dom";
import { CreateUserDto } from "../../interfaces/interfaces";

export default function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user: CreateUserDto = { name, email, password };

    createUser(user)
      .then((res) => {
        alert("Успех! Вы будете перенаправлены на страницу входа!");
        console.log(res);
        setTimeout(() => history.push("/login"), 3000);
      })
      .catch((err) => {
        switch (err.message) {
          case "417":
            console.log("Пользователь с таким имейлом уже существует!");
            break;
          case "422":
            console.log("Некорректные имя пользователя или пароль!");
            break;
          default:
            console.log(
              "Произошла ошибка при регистрации! Пожалуйста, попробуй ещё раз."
            );
            break;
        }
      });
  };

  return (
    <div className="signup-container relative rounded bg-gray-700 w-96 h-96 px-11">
      <a href="/" className="absolute text-gray-200 top-4 right-4">
        <img src={closeIcon} alt="close" />
      </a>
      <form
        className="signup flex flex-col items-center justify-center border-b-2 border-gray-400 pt-9 pb-6"
        onSubmit={handleSubmit}
      >
        <h4 className="text-lg font-bold text-gray-200 tracking-wide mb-6">
          Регистрация
        </h4>
        <CustomInput
          autoFocus
          id="signupUserName"
          placeholder="Имя пользователя"
          required
          value={name}
          onChange={(e: Event) => setName((e.target as HTMLInputElement).value)}
        />
        <CustomInput
          id="signupEmail"
          type="email"
          placeholder="Укажите адрес эл. почты"
          required
          value={email}
          onChange={(e: Event) =>
            setEmail((e.target as HTMLInputElement).value)
          }
        />
        <CustomInput
          id="signupPassword"
          type="password"
          placeholder="Введите пароль"
          minLength="8"
          required
          autoComplete="new-password"
          value={password}
          onChange={(e: Event) =>
            setPassword((e.target as HTMLInputElement).value)
          }
        />
        <LoaderButton
          type="submit"
          className="btn_signup w-full mt-4 bg-green-700 hover:bg-green-600 transition-colors text-white leading-6 font-bold py-2 px-4"
          isLoading={false}
          disabled={false}
        >
          Продолжить
        </LoaderButton>
      </form>
      <a
        href="/login"
        className="text-green-500 hover:text-green-400 transition-colors block text-center text-xs tracking-wide mx-auto mt-6"
      >
        Уже есть аккаунт? Войти
      </a>
    </div>
  );
}
