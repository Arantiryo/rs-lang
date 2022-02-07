import React from "react";
const caterogriesList = [
  {
    name: 'Beginner',
    title: '1-600',
    level: 'A1'
  },
  {
    name: 'Easy',
    title: '601-1200',
    level: 'A2'
  },
  {
    name: 'Normal',
    title: '1201-1800',
    level: 'B1'
  },
  {
    name: 'Medium',
    title: '1801-2400',
    level: 'B2'
  },
  {
    name: 'Hard',
    title: '2401-3000',
    level: 'C1'
  },
  {
    name: 'Monstrous',
    title: '3001-3600',
    level: 'C2'
  }
];

type InputParams = {
  category: Number,
  onClickCategory: (e: React.MouseEvent<HTMLElement>) => void
}

export default function TextbookCategories({ category, onClickCategory }: InputParams) {
  return (
    <div className="flex items-center gap-3">
      <div>
        <div>Учебник</div>
        <div>Уровень сложности</div>
      </div>
      <ul className="flex gap-2">
        {caterogriesList.map((obj, index) => {
          const categoryNode =
            <li
              className={`flex rounded items-center justify-between gap-3 w-32 p-2 border border cursor-pointer ${index === category && 'text-red-600'}`}
              key={index}
              id={index.toString()}
              onClick={onClickCategory}>
              <div>
                <div>{obj.name}</div>
                <div>{obj.title}</div>
              </div>
              <div>{obj.level}</div>
            </li>

          return categoryNode;
        })}
      </ul>
    </div>
  );
}