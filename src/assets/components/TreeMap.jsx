import PropTypes from 'prop-types';
import styled from 'styled-components';

const TreeMapContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 800px;
  height: 600px;
  border: 1px solid #ccc;
`;

const TreeMapItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 14px;
  box-sizing: border-box;
  border: 1px solid #fff;
`;

const TreeMap = ({ data }) => {
  // Função para calcular a cor com base no percentual de crescimento
  const getColor = (percentChange) => {
    if (percentChange > 0) {
      return `rgba(0, 128, 0, ${percentChange / 100})`; // Verde para crescimento
    } else {
      return `rgba(255, 0, 0, ${Math.abs(percentChange) / 100})`; // Vermelho para decréscimo
    }
  };

  // Calcular a área total das vendas
  const totalSales = data.reduce((sum, item) => sum + item.sales, 0);

  return (
    <TreeMapContainer>
      {data.map((item) => {
        const width = (item.sales / totalSales) * 100 + '%';
        const height = (item.sales / totalSales) * 100 + '%';
        const backgroundColor = getColor(item.percentChange);

        return (
          <TreeMapItem
            key={item.brand}
            style={{ width, height, backgroundColor }}
          >
            {item.brand}
          </TreeMapItem>
        );
      })}
    </TreeMapContainer>
  );
};

// Adicionar validação de props
TreeMap.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      brand: PropTypes.string.isRequired,
      sales: PropTypes.number.isRequired,
      percentChange: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default TreeMap;