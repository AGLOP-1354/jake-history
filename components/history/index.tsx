import classes from './history.module.css';

export type HistoryType = {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  tags?: string[];
  likeCount: number;
}

const History = ({ title, content, tags, likeCount }: HistoryType) => {
  return (
    <div className={classes.History}>
      <div className={classes.historyImage}>이미지</div>
      
      <div className={classes.historyContentWrapper}>
        <h3 className={classes.historyTitle}>{title}</h3>
        <span className={classes.historyContent}>{content}</span>

        <span className={classes.historyCreateDate}>2024년 10월 30일</span>
      </div>

      <div style={{ height: 1, width: '100svw', background: '#9e9e9e' }} />
      <div className={classes.historyAdditionalInformation}>
        <div className={classes.historyTags}>
          {
            tags?.map(tag => <span key={tag} className={classes.historyTag}>{tag}</span>)
          }
        </div>

        <span className={classes.heartCount}>하트 {likeCount}</span>
      </div>
    </div>
  );
}

export default History;