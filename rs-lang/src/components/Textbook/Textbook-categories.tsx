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
    <div className="flex items-center gap-3">
      <div>
        <div>Учебник</div>
        <div>Уровень сложности</div>
      </div>
      <ul className="flex flex-wrap gap-2">
        {caterogriesList.map((obj, index) => {
          const categoryNode =
            <li
              className={`flex rounded items-center justify-between gap-3 w-32 p-2 border cursor-pointer ${index === categoryIndex ? `${colors[categoryIndex].bg} text-white` : ''}`}
              key={index}
              onClick={() => onClickCategory(index)}
            >
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