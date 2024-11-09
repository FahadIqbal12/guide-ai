import React from 'react'
import MarkdownPreview from '@uiw/react-markdown-preview';

const TextEl = (props) => {
  return (

    <MarkdownPreview source={props.text} style={{backgroundColor:'transparent',color:'#000'}}/>
    
  )
}

export default TextEl