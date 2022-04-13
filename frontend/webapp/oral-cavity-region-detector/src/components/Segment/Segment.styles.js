import styled from "styled-components";

export const Wrapper = styled.div`
    width: 100%;
    margin: 0 auto;
    display: grid;
    padding: 20px;
    padding-top: 80px;

    @media screen and (max-width:640px){
        padding: 5% ;
        padding-top: 80px;
    }
`;

export const Grid = styled.div`
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    grid-auto-rows: minmax(min-content, max-content);
	grid-auto-flow: dense; /* Fill all spaces with fitted images */
    margin: 20px 0 40px 0;
    input[type="checkbox"][id^="myCheckbox"] {
        display: none;

        :not(:checked) + label{
            background-color: var(--lightColor) 
        }

        :checked + label{
            background-color: green;
        }
    }

    label{
        color: white;
        height: 30px;
        border-radius: 3px;
        display: flex;
        justify-content: center;
        align-items: center;
    }


`