import styled from "styled-components"

export const Container = styled.div`
    input[type="checkbox"][id^="myCheckbox"] {
        display: none;


        :checked + label:before {
            content: "✓";
            background-color: var(--lightColor);
            transform: scale(1);
        }

        :checked + label img {
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
  margin: auto;
  width: 40px;
  height: 40px;
  text-align: center;
  line-height: 28px;
  transition-duration: 0.4s;
  transform: scale(0);
  padding: 5px;
}
`