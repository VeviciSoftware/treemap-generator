import PropTypes from 'prop-types';
import styled from 'styled-components';

const getColor = (percentChange) => {
  if (percentChange > 0) {
    return `rgba(0, 128, 0, ${Math.min(1, percentChange / 100 + 0.1)})`; // Verde
  } else {
    return `rgba(255, 0, 0, ${Math.min(1, Math.abs(percentChange) / 100 + 0.1)})`; // Vermelho
  }
};

const segmentate = (data, start, end, total, bounds, horizontal) => {
  if (start >= end) return [];

  if (end - start === 1) {
    const item = data[start];
    const color = getColor(item.percentChange);
    return [{
      ...bounds,
      color,
      brand: item.brand,
      sales: item.sales,
      percentChange: item.percentChange
    }];
  }

  let sum = 0;
  let index = start;
  const halfTotal = total / 2;

  while (sum < halfTotal && index < end - 1) {
    sum += data[index].sales;
    index++;
  }

  if (index === start) index++; // Evitar recursão infinita

  const ratio = sum / total;
  let head, tail;

  if (horizontal) {
    const width = bounds.width * ratio;
    head = { x: bounds.x, y: bounds.y, width, height: bounds.height };
    tail = { x: bounds.x + width, y: bounds.y, width: bounds.width - width, height: bounds.height };
  } else {
    const height = bounds.height * ratio;
    head = { x: bounds.x, y: bounds.y, width: bounds.width, height };
    tail = { x: bounds.x, y: bounds.y + height, width: bounds.width, height: bounds.height - height };
  }

  return [
    ...segmentate(data, start, index, sum, head, !horizontal),
    ...segmentate(data, index, end, total - sum, tail, !horizontal)
  ];
};

const TreeMapContainer = styled.div`
  position: relative;
  width: 1150px;
  height: 1000px;
`;

const TreeMapSegment = styled.div`
  position: absolute;
  border: 1px solid #fff;
  box-sizing: border-box;
  color: white;
  padding: 5px;
  font-size: 12px;
  overflow: hidden;
`;

const TreeMap = ({ data }) => {
  const totalSales = data.reduce((sum, item) => sum + item.sales, 0);
  const bounds = { x: 0, y: 0, width: 100, height: 100 }; // Usando porcentagem para responsividade
  const segments = segmentate(data, 0, data.length, totalSales, bounds, true);

  return (
    <TreeMapContainer>
      {segments.map((segment, index) => (
        <TreeMapSegment
          key={index}
          style={{
            left: `${segment.x}%`,
            top: `${segment.y}%`,
            width: `${segment.width}%`,
            height: `${segment.height}%`,
            backgroundColor: segment.color,
          }}
        >
          <div>{segment.brand}</div>
          <div>{segment.sales}</div>
          <div>{segment.percentChange}%</div>
        </TreeMapSegment>
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