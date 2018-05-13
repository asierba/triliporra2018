import React from 'react';

export default function TeamFlag(props) {
  const teamName = props.name;
  const src = `images/flags/${teamName}.png`;
  const alt = `flag ${teamName}`;
  const style = {
    width: "63px",
    height: "63px"
  }
  return <figure><img alt={alt} src={src} style={style}/></figure>;
}
