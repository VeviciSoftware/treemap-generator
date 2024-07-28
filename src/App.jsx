// import { useState } from 'react'
import styled from 'styled-components'
import MainPage from './assets/components/MainPage'

const FundoGradiente = styled.div`
  background: linear-gradient(174.61deg, #041833 4.16%, #04244F 48%, #154580 96.76%);
  width: 100%;
  min-height: 100vh;
`

const AppContainer = styled.div`
  width: 1440px;
  margin: 0 auto;
  max-width: 100%;
`

function App() {

  return (
    <>
      <FundoGradiente>
        <AppContainer>
          <MainPage />
        </AppContainer>
      </FundoGradiente>
  
    </>
  )
}

export default App
