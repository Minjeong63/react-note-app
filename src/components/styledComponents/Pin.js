import React from 'react';
import { MdPushPin } from 'react-icons/md';

const Pin = ({ selected }) => {
  const color = selected ? 'red' : 'gray';

  return <MdPushPin style={{ color, cursor: 'pointer' }} />;
};

export default Pin;
