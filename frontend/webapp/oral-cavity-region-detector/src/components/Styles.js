import styled from 'styled-components'

export const Wrapper = styled.div`
    margin-top: 50px;
    padding: 5% ;
`

export const Border = styled.div`
    border: 4px solid var(--medColor);
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px ;
`;

export const Button = styled.button`
        min-width: 100px;
        margin: 10px 0;
        background-color: var(--medColor);
        border: 0;
        margin-right: 10px;
        border-radius: 5px;
        height: 40px ;
        color: white;
        cursor: pointer;

        :active {
            transform: translateY(2px);
        }

        :disabled {
            background-color: lightGray;
        }
`