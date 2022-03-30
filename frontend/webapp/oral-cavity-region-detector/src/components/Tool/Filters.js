import * as React from 'react';

export default function Filters({name, handleCheckbox}) {
  return (
      <>
      <input type="checkbox" 
      id={`myCheckbox${name}`}
      value = {name}
      onChange={handleCheckbox}
      />
    <label htmlFor={`myCheckbox${name}`}>{name}</label>     
    </>
  );
}
