import LoaderButton from "../btn_type_loader/LoaderButton";
import TextInput from "../TextInput/TextInput";
import closeSvg from "../../assets/svg/close.svg";

export default function SignUpForm() {
  // const [fields, handleFieldChange] = useFormFields({
  //   email: "",
  //   password: "",
  //   confirmPassword: "",
  //   confirmationCode: "",
  // });

  // return <form onSubmit={handleSubmit}></form>;
  return (
    <div className="signup-container relative rounded bg-gray-700 w-96 h-96 px-11">
      <a href="/" className="absolute text-gray-200 top-4 right-4">
        <img src={closeSvg} alt="close" />
      </a>
      <form className="signup flex flex-col items-center justify-center border-b-2 border-gray-400 pt-9 pb-6">
        <h4 className="text-lg font-bold text-gray-200 tracking-wide mb-6">
          Регистрация
        </h4>
        <TextInput placeholder="Укажите адрес эл. почты" />
        <TextInput placeholder="Имя пользователя" />
        <TextInput placeholder="Подтвердите пароль" />
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
