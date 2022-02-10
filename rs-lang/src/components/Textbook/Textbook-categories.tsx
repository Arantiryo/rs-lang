import React from "react";
import { colors } from './Textbook';

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

type Params = {
  categoryIndex: number,
  onClickCategory: (index: number) => void,
}

export default function TextbookCategories({ categoryIndex, onClickCategory }: Params) {
  return (
    <div className="
      flex flex-col gap-3
      lg:flex-row"
    >
      <div>
        <div className="text-base font-bold tracking-wider text-green-700">Учебник</div>
        <div className="text-sm text-indigo-400">Уровень сложности</div>
      </div>
      <ul className="flex gap-2 overflow-x-auto text-xs">
        {caterogriesList.map((obj, index) => {
          const categoryNode =
            <li
              className={`flex relative min-w-max rounded bg-gray-700 border-gray-700 items-center 
                justify-between gap-3 p-2 border cursor-pointer h-12 overflow-hidden
                ${index === categoryIndex ? `${colors[categoryIndex].bg} text-white ` : 'opacity-40'}`
              }
              key={index}
              onClick={() => onClickCategory(index)}
            >
              <div>
                <div>{obj.name}</div>
                <div>{obj.title}</div>
              </div>
              <div className="relative z-10">{obj.level}</div>
              <div className={`absolute rounded-full -right-6 -bottom-1 w-14 h-14 z-0 ${`${index === categoryIndex ? 'bg-gray-700 bg-gray-900' : `${colors[index].bg} `}`}`}></div>
            </li>
          return categoryNode;
        })}
      </ul>
    </div>
  );
}