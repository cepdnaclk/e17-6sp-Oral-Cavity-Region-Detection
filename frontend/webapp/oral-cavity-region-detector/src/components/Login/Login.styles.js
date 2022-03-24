import styled from 'styled-components'
import img from '../../images/background.jpeg'

export const Wrapper = styled.div`
    position: relative;
`;

export const Container = styled.div`
    display: flex;

    @media screen and (max-width:640px){
        flex-direction: column;
        padding: 5% ;
    }
`;

export const Img = styled.div`
    background-image: url(${img});
    background-size: cover;
    min-height: 100vh ;
    flex-grow: 1;

    @media screen and (max-width:640px){
        display: none;
    }
`;

export const Form = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    padding-top: 50px;

    @media screen and (max-width:640px){
        width: 100%;
    }

    h2{
        color: var(--medColor);
    }

    span{
        color: var(--medColor);
        font-weight: 500;
        text-decoration: underline;
    }
    th{
        text-align: left;
        font-weight: 500;
    }

    /* input{
        border: 1px solid var(--medColor);
        border-radius: 5px;
        height: 30px;
        width: 100%;
    } */

`;

export const Border = styled.div`
    border: 2px solid var(--medColor);
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 5% ;
`;




