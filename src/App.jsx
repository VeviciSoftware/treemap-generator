// import { useState } from 'react'
import styled from 'styled-components'
import MainPage from './assets/components/MainPage'

const FundoGradiente = styled.div`
  background: linear-gradient(174.61deg, #506177 4.16%, #c4e3e9 48%, #d9eaff 96.76%);
  width: 100%;
  min-height: 100vh;
`

const AppContainer = styled.div`
  width: 1440px;
  margin: 0 auto;
  max-width: 100%;
`

const MainContainer = styled.main`
  display: flex;
  gap: 24px;
`

function App() {

  return (
    <>
      <FundoGradiente>
        <AppContainer>
          <MainContainer>
            <MainPage />
          </MainContainer>
        </AppContainer>
      </FundoGradiente>
  
    </>
  )
}

export default App
