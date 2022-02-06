import { useState } from "react";
import TextbookCategories from "./Textbook-categories";
import TextbookDetails from "./Textbook-details";
import TextbookWords from "./Textbook-words";

export default function Textbook() {
  const [category, setCategory] = useState(0);
  const chooseCategory = (e: React.MouseEvent<HTMLElement>) => setCategory(Number((e.target as HTMLElement).id));

  return (
    <main className="max-w-md">
      <TextbookCategories category={category} onClickCategory={chooseCategory} />
      <div>
        <TextbookWords category={category} />
        <TextbookDetails />
      </div>
    </main>
  );
}