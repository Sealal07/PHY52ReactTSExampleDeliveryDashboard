import { useState } from 'react';
import { GenericList } from './components/GenericList';
import { DeliveryCard } from './components/DeliveryCard';
import { useDelivery } from './context/DeliveryContext';
import { CourierManager } from './components/CourierManager';

const DashboardConsole = (): JSX.Element => {
  const { state, assignCourierToOrder } = useDelivery();

  if(state.status === 'LOADING') return <h2>Загрузка данных</h2>;
  if(state.status === 'ERROR') return <h2>{state.message}</h2>

  const filteredOrders = state.status === 'SUCCESS' ? state.data : [];

  const handleInteractOrder = (id: string) => {
    const courierName = prompt('Введите имя курьера');
    if (courierName) {
      assignCourierToOrder(id, courierName);
    }
  }

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '24px'
    }}>
      <header style={{
        borderBottom: '3px solid #4f46e5',
        paddingBottom: '12px',
        marginBottom: '24px'
      }}>
        <h1>Delivery Dashboard</h1>
      </header>
      <div style={{
        display: 'grid', 
        gridTemplateColumns: '2fr 1fr',
        gap: '24px'
      }}
        >
          <div>
            <h2>Активные заказы</h2>
            <GenericList
              items={filteredOrders}
              emptyPlaceholder='Заказы не найдены'
              renderItem={(order) => (
                <DeliveryCard 
                  order={order}
                  onSelectedOrder={handleInteractOrder}
                />
              )}
            />
          </div>
          <div>
            <h2>Персонал</h2>
            <CourierManager />
          </div>
        </div>
    </div>
  );
}

export default DashboardConsole;
