import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const getColor = (percentChange) => {
  if (percentChange > 0) {
    return `rgba(0, 128, 0, ${Math.min(1, percentChange / 100 + 0.1)})`; // Verde
  } else {
    return `rgba(255, 0, 0, ${Math.min(1, Math.abs(percentChange) / 100 + 0.1)})`; // Vermelho
  }
};

const segmentate = (ctx, data, start, end, total, bounds, horizontal) => {
  if (start >= end) return;

  if (end - start === 1) {
    const item = data[start];
    const color = getColor(item.percentChange);
    ctx.fillStyle = color;
    ctx.fillRect(bounds.x, bounds.y, bounds.width, bounds.height);
    ctx.strokeRect(bounds.x, bounds.y, bounds.width, bounds.height);
    ctx.fillStyle = 'white';
    ctx.fillText(item.brand, bounds.x + 5, bounds.y + 15);
    return;
  }

  let sum = 0;
  let index = start;
  const halfTotal = total / 2;

  while (sum < halfTotal && index < end) {
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

  // Verificar se a divisão é válida antes de chamar recursivamente
  if (start < index && index < end) {
    segmentate(ctx, data, start, index, sum, head, !horizontal);
    segmentate(ctx, data, index, end, total - sum, tail, !horizontal);
  }
};

const TreeMapCanvas = ({ data }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const totalSales = data.reduce((sum, item) => sum + item.sales, 0);
    const bounds = { x: 0, y: 0, width: canvas.width, height: canvas.height };
    segmentate(ctx, data, 0, data.length, totalSales, bounds, true);
  }, [data]);

  return <canvas ref={canvasRef} width={750} height={750} />;
};

TreeMapCanvas.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      brand: PropTypes.string.isRequired,
      sales: PropTypes.number.isRequired,
      percentChange: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default TreeMapCanvas;