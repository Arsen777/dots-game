import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const Home = lazy(() => import('pages/home'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback="...loading">
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
