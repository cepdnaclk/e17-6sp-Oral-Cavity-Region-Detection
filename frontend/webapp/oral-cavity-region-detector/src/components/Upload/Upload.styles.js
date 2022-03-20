import styled from 'styled-components'

export const Wrapper = styled.div`
    width: 100%;
    margin: 0 auto;
    display: grid;

    grid-template-columns: repeat(1, 1fr);
    
    @media (min-width: 700px) {
        grid-template-columns: auto 50%;
    }

    @media (min-width: 850px) {
        grid-template-columns: auto 500px;
    }

`;

export const Table = styled.table`
    tbody tr td input,
    tbody tr td textarea,
    tbody tr td select {
        border: 2px solid #D3D3D3;
        border-radius: 5px;
        height: 30px;
        min-width: 150px;
    }

`

export const Section = styled.div`
    max-height: 100vh;
    @media (max-width: 700px) {
        border: 0 !important;
    }
  overflow: auto;
  padding: 80px 1rem 0 1rem;
    ul li button{
        font-weight: 600 ;
        color: var(--medColor);
        :hover{
        color: var(--medColor) 
        }
    }
`

export const Grid = styled.div`
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    grid-auto-rows: min-content;
	//grid-auto-flow: dense; /* Fill all spaces with fitted images */

    div {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 2em;
    }

    img {
        width: 100%;
        object-fit: cover;
    }

    label img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    input[type="checkbox"][id^="myCheckbox"] {
        display: none;


    :checked + label:before {
        content: "✓";
        background-color: var(--lightColor);
        transform: scale(1);
    }

    :checked + label img {
        box-shadow: 0 0 5px #333;
        z-index: -1;
    }
}

label {
    width: 100%;
    height: 100%;
    display: block;
    position: relative;
    cursor: pointer;
}

label:before {
  background-color: white;
  box-shadow: 0 0 20px #000;
  color: white;
  content: " ";
  display: block;
  border-radius: 50%;
  position: absolute;
  top: 0; 
  left: 0; 
  bottom: 0; 
  right: 0;
  margin: auto;
  width: 25px;
  height: 25px;
  text-align: center;
  line-height: 28px;
  transition-duration: 0.4s;
  transform: scale(0);
  padding: 5px;
}
`

export const Border = styled.div`
    border: 2px solid #D3D3D3;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 5% ;
    font-size: 15px;
`;