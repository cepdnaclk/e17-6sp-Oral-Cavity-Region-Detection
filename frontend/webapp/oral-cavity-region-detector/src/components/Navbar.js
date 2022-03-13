import styled from 'styled-components'

export const Wrapper = styled.div`
    padding-top: 50px;
`
export const Navbar = styled.div`
    position: fixed;
    z-index:10;
    top: 0;
    width: 100%;
    height: 50px;

    display: flex;
    justify-content: flex-end;
    align-items: center;
     
    padding: 0 30px;
    color: white;
    background-color: var(--lightColor);
`;