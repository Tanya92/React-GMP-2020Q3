import React from "react";

import Header from "./header";
import Main from "./main";
import Footer from './footer';
import ErrorBoundary from '../utils/error-boundary';

import '../styles/app.less';
import '../styles/reset.css';

const App = () => (
  <>
    <Header/>
    <Main />
    <ErrorBoundary>
      <Footer />
    </ErrorBoundary>
  </>
)

// const AppWithRouter = () => (
//   <Router>
//     <Switch>
//       <Route path='/' exact>
//         <App/>
//       </Route>
//       <Route path='*'>
//         <PageNotFound errorMessage='404'/>
//       </Route>
     
//     </Switch>
//   </Router>
// );

export default App;

