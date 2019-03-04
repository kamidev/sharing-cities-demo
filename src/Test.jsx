import React from 'react';

export default function Test() {

  const test = () => alert('hi');


  return (
    <div>
      <h1>hello world</h1>
      <h2>Hi</h2>

      <button onClick={test}>Click me</button>
    </div>
  );
}
