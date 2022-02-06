import React from "react";
const caterogriesList = ['beginner', 'easy', 'normal', 'medium', 'hard', 'monstrous'];

type InputParams = {
  category: Number,
  onClickCategory: (e: React.MouseEvent<HTMLElement>) => void
}

export default function TextbookCategories({ category, onClickCategory }: InputParams) {
  return (
    <ul>
      {caterogriesList.map((item, index) => {
        const categoryNode =
          <li
            className={(index === category) ? 'active' : ''}
            key={index}
            id={index.toString()}
            onClick={onClickCategory}>{item}
          </li>
        return categoryNode;
      })}
    </ul>
  );
}