import { ReactChild, ReactFragment } from "react";

export default function Main(props: {
  children: ReactChild | ReactFragment;
  className?: string;
}) {
  return (
    <main
      className={`${props.className ? props.className : ""
        } home bg-gray-800 overflow-hidden`}
    >
      <div className="px-5 max-w-7xl mx-auto xxl:px-0">{props.children}</div>
    </main>
  );
}
