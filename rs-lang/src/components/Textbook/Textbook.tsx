import { useState } from "react";
import TextbookCategories from "./Textbook-categories";
import TextbookDetails from "./Textbook-details";
import TextbookWords from "./Textbook-words";

export default function Textbook() {
  const [category, setCategory] = useState(0);
  const chooseCategory = (e: React.MouseEvent<HTMLElement>) => setCategory(Number((e.currentTarget as HTMLElement).id));

  return (
    <div className="container mx-auto max-w-screen-xl p-2">
      <main className="flex flex-col gap-2">
        <TextbookCategories category={category} onClickCategory={chooseCategory} />
        <div>
          <TextbookWords category={category} />
          <TextbookDetails />
        </div>
      </main>
    </div>
  );
}