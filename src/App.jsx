// import { useState } from 'react'
import styled from 'styled-components'
import MainPage from './assets/components/MainPage'

const FundoGradiente = styled.div`
  background: linear-gradient(180deg, #F2F2F2 0%, #8d8b8b 100%);
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
