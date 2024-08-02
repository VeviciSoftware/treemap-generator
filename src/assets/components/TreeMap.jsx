import PropTypes from 'prop-types';
import styled from 'styled-components';

const TreeMapContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 800px;
  height: 600px;
  border: 1px solid #ccc;
  position: relative;
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
  background-color: ${({ percentChange }) => (percentChange > 0 ? 'green' : 'red')};
  opacity: ${({ percentChange }) => Math.min(Math.abs(percentChange) / 100, 1)};
  position: absolute;
`;

const TreeMap = ({ data }) => {
  const containerWidth = 800;
  const containerHeight = 600;
  const totalArea = containerWidth * containerHeight;

  // Calcula o total de vendas
  const totalSales = data.reduce((sum, item) => sum + item.sales, 0);

  // Função para distribuir os itens usando o algoritmo slice-and-dice
  const calculatePositions = (items, x, y, width, height, horizontal) => {
    if (items.length === 0) return [];

    let currentX = x;
    let currentY = y;
    let positions = [];

    items.forEach(item => {
      const itemArea = (item.sales / totalSales) * totalArea;
      const itemWidth = horizontal ? (itemArea / height) : width;
      const itemHeight = horizontal ? height : (itemArea / width);

      positions.push({
        ...item,
        x: currentX,
        y: currentY,
        width: itemWidth,
        height: itemHeight,
      });

      if (horizontal) {
        currentX += itemWidth;
      } else {
        currentY += itemHeight;
      }
    });

    return positions;
  };

  const positions = calculatePositions(data, 0, 0, containerWidth, containerHeight, true);

  return (
    <TreeMapContainer>
      {positions.map((item) => (
        <TreeMapItem
          key={item.brand}
          style={{ left: `${item.x}px`, top: `${item.y}px`, width: `${item.width}px`, height: `${item.height}px` }}
          percentChange={item.percentChange}
        >
          <div>{item.brand}</div>
          <div>{item.sales}</div>
        </TreeMapItem>
      ))}
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