import styled from 'styled-components'

export const Wrapper = styled.div`
    padding-top: 70px;
    display: flex;

    width: 100%;
    margin: 0 auto;
    display: grid;
    grid-gap: 1rem;

    @media (min-width: 900px) {
        grid-template-columns: repeat(3, 1fr);
    }
    
    @media (min-width: 600px) {
        grid-template-columns: repeat(2, 1fr);
    }

`;

export const Table = styled.table`
    tbody tr th input, tbody tr th textarea {
        border: 2px solid var(--medColor);
        border-radius: 5px;
        height: 30px;
        width: 100%;
    }

    tbody tr th textarea{
        max-width: 50vw;

        @media (max-width: 900px) {
            max-width: 100vw;
        }
    }
`

export const Section = styled.div`
  padding: 1rem;
  height:min-content;
`

export const Grid = styled.div`
    display: grid;
    grid-gap: 5px;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    grid-auto-rows: 125px;
	grid-auto-flow: dense; /* Fill all spaces with fitted images */

    div {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 2em;
    }

    img {
        width: 100%;
        height: 100%;
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