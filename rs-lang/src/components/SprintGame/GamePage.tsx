import { useEffect, useState } from "react";
import ISprintData from "../../interfaces/ISprintData";
import IWord from "../../interfaces/IWord";
import shuffle from "../../utils/shuffle";
import { getWords } from "../../utils/WebClients";
import Countdown from "./Countdown";
import Game from "./Game";

export default function GamePage(props: {
  categoryIndex: number,
  onGameEnd: () => void,
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<ISprintData[]>([]);
  const onGameBegin = () => setIsLoading(false);

  useEffect(() => {
    const page = Math.floor(Math.random() * 30);
    getWords(page, props.categoryIndex).then((list: IWord[]) => {
      const LENGTH = 2;
      const MIN = 0;
      const MAX = list.length - 1;

      const data = list.map(obj => {
        const options = new Set([obj.wordTranslate]);

        while (options.size < LENGTH) {
          let randomIndex = Math.floor(Math.random() * (MAX - MIN + 1)) + MIN;
          options.add(list[randomIndex].wordTranslate);
        }

        return {
          ...obj,
          options: shuffle(Array.from(options))
        }
      })

      setData(data);
    });
  }, [props.categoryIndex]);

  return (
    <div className="h-full flex flex-col justify-center">
      {isLoading ? (
        <Countdown onGameBegin={onGameBegin} />
      ) : (
        <Game data={data} onGameEnd={props.onGameEnd} />
      )}
    </div>
  );
}