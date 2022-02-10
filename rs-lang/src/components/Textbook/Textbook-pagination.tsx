import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { colors, CountActionKind } from './Textbook';

function getPageIndexes(pageIndex: number) {
  switch (true) {
    case (pageIndex < 4):
      return [0, 1, 2, 3, 4, '...', 29];
    case (pageIndex > 3 && pageIndex < 26):
      return [0, '...', pageIndex - 1, pageIndex, pageIndex + 1, '...', 29];
    case (pageIndex > 25):
      return [0, '...', 25, 26, 27, 28, 29];
    default:
      return [];
  }
}

export default function TextbookPagination(props: {
  page: number,
  categoryIndex: number,
  onClickPage: (index: { type: CountActionKind; jump?: number }) => void,
}) {

  return (
    <>
      <button onClick={() => props.onClickPage({ type: CountActionKind.DECREASE })}>
        <span>
          <MdKeyboardArrowLeft className="text-lg lg:text-3xl" />
        </span>
      </button>
      <div className="flex">
        {getPageIndexes(props.page).map((p, i) => {
          if (p === '...') {
            return (<div
              key={i}
              className='relative w-7 inline-flex justify-center'
            >...</div>)
          } else {
            return (
              <button
                key={i}
                className={`relative w-7 h-7 ${props.page === p ? `text-slate-900` : ''}`}
                onClick={() => props.onClickPage({ type: CountActionKind.SPECIFIC, jump: Number(p) })}
              >
                <span
                  className={`absolute inline-flex items-center justify-center inset-0 
                  ${props.page === p ? `rounded-full ${colors[props.categoryIndex].bg}` : ''}`}
                >
                  {Number(p) + 1}
                </span>
              </button>)
          }
        })}
      </div>
      <button onClick={() => props.onClickPage({ type: CountActionKind.INCREACE })}>
        <span>
          <MdKeyboardArrowRight className="text-lg lg:text-3xl" />
        </span>
      </button>
    </>
  );
}