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
    tbody tr td{
        width: 50%;
    }

`

export const Section = styled.div`
    max-height: 100vh;
    @media (max-width: 700px) {
        border: 0 !important;
    }
  overflow: auto;
  padding: 90px 1rem 0 1rem;
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
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-auto-rows: minmax(min-content, max-content);
	grid-auto-flow: dense; /* Fill all spaces with fitted images */
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