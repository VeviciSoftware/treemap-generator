// import styled from 'styled-components';
import TreeMap from "./TreeMap";

const MainPage = () => {
  const carSalesData = [
    { brand: 'Toyota', sales: 50000, percentChange: 10 },
    { brand: 'Volkswagen', sales: 45000, percentChange: -5 },
    { brand: 'Ford', sales: 30000, percentChange: 20 },
    // Adicione mais dados conforme necessário
  ];

  return (
    <div>
      <h1>Marcas de Carro Mais Vendidas no Brasil</h1>
      <TreeMap data={carSalesData} />
    </div>
  );
};

export default MainPage;