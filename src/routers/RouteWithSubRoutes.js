import { Route } from "react-router-dom";

function RouteWithSubRoutes(route) {
  if (route.component === null) {
    return <Route
      path={route.path}
      exact={route.exact}
      children={
        <div style={{
          width: '100%',
          height: '500px',
          background: '#fff',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#000'
        }}>
          <h1>Chưa có màn hình</h1>
        </div>
      }
    />
  }
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={props => {
        return <route.component {...props} routes={route.children} />
      }}
    />
  );
}

export default RouteWithSubRoutes;
