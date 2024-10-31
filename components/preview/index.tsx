import React from "react";

import classes from './preview.module.css';

type Props = {
  content: string;
  storyTitle: string;
}

const Preview = ({ content, storyTitle }: Props) => {
  return (
    <div className={classes.preview}>
      <h1 className={classes.storyTitle}>{storyTitle}</h1>
      <span dangerouslySetInnerHTML={{__html: content}}/>
    </div>
  )
}

export default Preview;
