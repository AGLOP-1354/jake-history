import History from "../components/history";
import type { HistoryType } from "../components/history";

import classes from "./page.module.css";



const TEMP_HISTORY_DATA_LIST: HistoryType[] = [
  {
    id: '123',
    title: '리액트란 무엇인가요?',
    content: '리액트는 리액트입니다',
    tags: ['ReactJS'],
    likeCount: 23
  }, {
    id: '1233',
    title: '넥스트란 무엇인가요?',
    content: '넥스트는 넥스트입니다',
    tags: ['NextJS'],
    likeCount: 2
  }, {
    id: '1223',
    title: 'useEffect 그렇게 쓰는거 아닌데',
    content: '퉤',
    tags: ['ReactJS', 'react-hoooks'],
    likeCount: 223
  }, {
    id: '12213',
    title: '브라우저 렌더링 방식',
    content: '브라우저가 렌더링 해줍니다!',
    tags: ['Common'],
    likeCount: 245
  },
]

const Home = () => {
  return (
    <main className={classes.Home}>
      {
        TEMP_HISTORY_DATA_LIST?.map((historyData) => (
          <History key={historyData.id} {...historyData} />
        ))
      }
    </main>
  )
}

export default Home