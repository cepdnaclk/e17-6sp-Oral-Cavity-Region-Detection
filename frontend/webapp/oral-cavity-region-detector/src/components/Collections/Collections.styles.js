import styled from 'styled-components'

export const Wrapper = styled.div`
    margin-top: 70px;
    display: flex;
`;

export const Collection = styled.div`
    flex-grow: 1;
`

export const Info = styled.div`
    flex-basis: fit-content;
    flex-direction: column; ;
    display: flex;
    justify-content: center;
    padding: 20px;
    background-color: rgba(229, 229, 229, 1);

    img{
        width: 400px;
        height: 300px;
        margin-left:auto;
        margin-right:auto;
    }

`