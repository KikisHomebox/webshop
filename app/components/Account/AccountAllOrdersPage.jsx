import {Link, useNavigate} from '@remix-run/react';
import {Money, Pagination} from '@shopify/hydrogen';
import ActionButton from '../ActionButton/ActionButton';

const AccountAllOrdersPage = ({customer}) => {
  const {orders, numberOfOrders} = customer;
  const navigate = useNavigate();

  return (
    <div className="orders">
      <h1 className="account-heading">
        Orders <small>({numberOfOrders})</small>
      </h1>
      {orders.nodes.length ? (
        <OrdersTable orders={orders} navigate={navigate} />
      ) : (
        <EmptyOrders navigate={navigate} />
      )}
    </div>
  );
};

const OrdersTable = ({orders, navigate}) => {
  return (
    <div className="acccount-orders">
      <Pagination connection={orders}>
        {({nodes, isLoading, PreviousLink, NextLink}) => {
          return (
            <>
              <PreviousLink>
                {isLoading ? 'Loading...' : <span>Load previous</span>}
              </PreviousLink>
              {nodes.map((order) => {
                return (
                  <OrderItem key={order.id} order={order} navigate={navigate} />
                );
              })}
              <NextLink>
                {isLoading ? 'Loading...' : <span>Load more</span>}
              </NextLink>
            </>
          );
        }}
      </Pagination>
    </div>
  );
};

const EmptyOrders = ({navigate}) => {
  return (
    <div className="account-empty-order">
      <p>You haven&apos;t placed any orders yet.</p>
      <ActionButton
        text="Start shopping"
        onClick={() => navigate(`/products`)}
        filled
        type={null}
      />
    </div>
  );
};

const OrderItem = ({order, navigate}) => {
  return (
    <div className="account-order-item">
      <fieldset>
        <Link to={`/account/orders/${order.id}`}>
          <strong>#{order.orderNumber}</strong>
        </Link>
        <p>{new Date(order.processedAt).toDateString()}</p>
        <p>{order.financialStatus}</p>
        <p>{order.fulfillmentStatus}</p>
        <Money data={order.currentTotalPrice} />
        <ActionButton
          text="View Order"
          onClick={() => navigate(`/account/orders/${btoa(order.id)}`)}
          type={null}
        />
      </fieldset>
    </div>
  );
};

export default AccountAllOrdersPage;
