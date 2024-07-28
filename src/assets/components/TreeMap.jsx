import PropTypes from 'prop-types';
import styled from 'styled-components';

const TreeMapContainer = styled.div`
  display: grid;
  width: 800px;
  height: 600px;
  border: 1px solid #ccc;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  grid-auto-rows: minmax(100px, auto);
`;

const TreeMapItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 14px;
  box-sizing: border-box;
  border: 1px solid #fff;
  background-color: ${({ isLarge }) => (isLarge ? 'rgba(0, 0, 0, 0.1)' : 'transparent')};
  font-family: 'Roboto', sans-serif; 
`;

const TreeMap = ({ data }) => {
  const getColor = (percentChange) => {
    if (percentChange > 0) {
      return `rgba(0, 128, 0, ${percentChange / 100})`; // Verde para crescimento
    } else {
      return `rgba(255, 0, 0, ${Math.abs(percentChange) / 100})`; // Vermelho para decréscimo
    }
  };

  const totalSales = data.reduce((sum, item) => sum + item.sales, 0);

  const sortedData = [...data].sort((a, b) => b.sales - a.sales);

  return (
    <TreeMapContainer>
      {sortedData.map((item, index) => {
        const area = (item.sales / totalSales) * 100;
        const backgroundColor = getColor(item.percentChange);
        const isLarge = index === 0;

        return (
          <TreeMapItem
            key={item.brand}
            style={{ gridArea: `span ${Math.ceil(area / 10)}`, backgroundColor }}
            isLarge={isLarge}
          >
            <div>{item.brand}</div>
            <div>{item.percentChange}%</div>
          </TreeMapItem>
        );
      })}
    </TreeMapContainer>
  );
};

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