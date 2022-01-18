import styled from 'styled-components'
import Coin from './Coin'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { coins } from '../static/coins'
import BalanceChart from './BalanceChart'
import { useEffect, useState } from 'react'

const tempFromAddress = '0xB4EbD453D80A01A0dC7De077c61B1c9b336F05E3'

const Portfolio = ({ twTokens, sanityTokens }) => {
  const [walletBalance, setWalletBalance] = useState(0)
  const [sender, setSender] = useState(tempFromAddress)

  const getBalance = async activeTwToken => {
    const balance = await activeTwToken.balanceOf(sender)

    return parseInt(balance.displayValue)
  }

  useEffect(() => {
    setWalletBalance(0)

    const calculateTotalBalance = async () => {
      sanityTokens.map(async token => {
        const currentTwToken = twTokens.filter(
          twToken => twToken.address === token.contractAddress,
        )

        const balance = await getBalance(currentTwToken[0])
        setWalletBalance(walletBalance + balance * token.usdPrice)
      })
    }

    if (sanityTokens.length > 0 && twTokens.length > 0) {
      calculateTotalBalance()
    }
  }, [twTokens, sanityTokens])

  return (
    <Wrapper>
      <Content>
        <Chart>
          <div>
            <Balance>
              <BalanceTitle>Portfolio balance</BalanceTitle>
              <BalanceValue>
                {'$'}
                {walletBalance.toFixed(2)}
              </BalanceValue>
            </Balance>
          </div>
          <BalanceChart />
        </Chart>
        <PortfolioTable>
          <TableItem>
            <Title>Your Assets</Title>
          </TableItem>
          <Divider />
          <Table>
            <TableItem>
              <TableRow>
                <div style={{ flex: 3 }}>Name</div>
                <div style={{ flex: 2 }}>Balance</div>
                <div style={{ flex: 1 }}>Price</div>
                <div style={{ flex: 1 }}>Allocation</div>
                <div style={{ flex: 0, color: '#0a0b0d' }}>
                  <BsThreeDotsVertical />
                </div>
              </TableRow>
            </TableItem>
            <Divider />
            <div>
              {coins.map(coin => (
                <div key={coin.name}>
                  <Coin coin={coin} />
                  <Divider />
                </div>
              ))}
            </div>
          </Table>
        </PortfolioTable>
      </Content>
    </Wrapper>
  )
}

export default Portfolio

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`
const Content = styled.div`
  width: 100%;
  max-width: 1000px;
  padding: 2rem 1rem;
`

const Chart = styled.div`
  border: 1px solid #282b2f;
  padding: 1rem 2rem;
`

const Balance = styled.div``

const BalanceTitle = styled.div`
  color: #8a919e;
  font-size: 0.9rem;
`

const BalanceValue = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0.5rem 0;
`

const PortfolioTable = styled.div`
  margin-top: 1rem;
  border: 1px solid #282b2f;
`

const Table = styled.div`
  width: 100%;
`

const TableRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  & > th {
    text-align: left;
  }
`

const TableItem = styled.div`
  padding: 1rem 2rem;
`

const Divider = styled.div`
  border-bottom: 1px solid #282b2f;
`

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
`
