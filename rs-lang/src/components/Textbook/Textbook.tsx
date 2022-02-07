import { useState } from "react";
import TextbookCategories from "./Textbook-categories";
import TextbookDetails from "./Textbook-details";
import TextbookWords from "./Textbook-words";

export default function Textbook() {
  const [category, setCategory] = useState(0);
  const chooseCategory = (index: number) => setCategory(index);

  return (
    <div className="container mx-auto max-w-screen-xl p-2">
      <main className="flex flex-col gap-2">
        <TextbookCategories category={category} onClickCategory={chooseCategory} />
        <div className="flex">
          <TextbookWords category={category} />
          <TextbookDetails category={category} />
        </div>
      </main>
    </div>
  );
}