import React , { FC, useRef } from 'react'

import AutoSizeInput from "../components/AutoSizeInput";

import styled from '@emotion/styled'

const Container = styled.div`
  margin: auto;
  display: grid;
  place-items: center;
  width: 600px;
  height: 100vh;
`
const App: FC = () => { 
    return (
    <Container>
        <AutoSizeInput label={'Name of Meeting'}></AutoSizeInput>
        <AutoSizeInput defaultValue="Ульяновск" label={'Location / Call'}></AutoSizeInput>
        <AutoSizeInput label={'Agenda'}></AutoSizeInput>
    </Container>
    )
}

export default App;