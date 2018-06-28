import React from 'react';

export default function TeamFlag(props) {
  const teamName = props.name.replace(' ','-');
  const src = `images/flags/${teamName}.png`;
  const alt = `flag ${teamName}`;

  const smallStyle = {
    width : '30px'
  };
  const style = props.small ? smallStyle : {};
  return <img alt={alt} src={src} style={style} />;
}
