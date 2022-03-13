import styled from 'styled-components'

export const Wrapper = styled.div`
    width: 100%;
    border-bottom: 1px solid lightgray;
    padding: 20px 0;
`

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