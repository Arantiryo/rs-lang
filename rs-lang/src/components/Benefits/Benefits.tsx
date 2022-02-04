import onlineAccessIcon from "../../assets/svg/benefits__online-access.svg";
import spaceRepetition from "../../assets/svg/benefits__space-repetition.svg";
import education from "../../assets/svg/benefits__education.svg";

export default function Benefits() {
  return (
    <div className="benefits-section relative w-full">
      {/* <div className="card__online-access flex flex-col items-center justify-between mb-10">
        <img className="mb-3" src={onlineAccessIcon} alt="online access " />
        <h3 className="mb-2 text-base leading-5 font-medium text-white">
          Онлайн доступ
        </h3>
        <p className="text-xs leading-5 text-center text-white">
          В отличие от оффлайн курсов наши игры и тренировки доступны всегда.
          Занимайтесь в удобное для вас время
        </p>
      </div> */}
      <BenefitsCard
        className="benefits-section"
        icon={onlineAccessIcon}
        heading="Онлайн доступ"
        text="В отличие от оффлайн курсов наши игры и тренировки доступны всегда.
          Занимайтесь в удобное для вас время"
      />
      <BenefitsCard
        className="card__spaced-repetition"
        icon={spaceRepetition}
        heading="Интервальные повторения"
        text="В приложении используется метод интервальных повторений, который является эффективным в изучении новых языков."
      />
      <BenefitsCard
        className="card__education"
        icon={education}
        heading="Обучение"
        text="Изучение английского языка без платных подписок и ограничений"
      />
      {/* <div className="card__spaced-repetition"></div>
      <div className="card__education"></div> */}
    </div>
  );
}

type BenefitsCardProps = {
  className: string;
  icon: string;
  heading: string;
  text: string;
};

function BenefitsCard(props: BenefitsCardProps) {
  return (
    <div
      className={
        props.className + " flex flex-col items-center justify-between mb-10"
      }
    >
      <img className="mb-3" src={props.icon} alt="online access " />
      <h3 className="mb-2 text-base leading-5 font-medium text-white">
        {props.heading}
      </h3>
      <p className="text-xs leading-5 text-center text-white">{props.text}</p>
    </div>
  );
}
