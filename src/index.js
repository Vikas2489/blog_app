import ReactDOM from 'react-dom/client';
import App from './Components/App';
import SingleArticle from './Components/SingleArticle';
import { BrowserRouter, Route } from 'react-router-dom';

let rootElm = document.getElementById('root');

ReactDOM.createRoot(rootElm).render(
  <BrowserRouter>
    <App />
    <Route path="/article/:slug" component={SingleArticle} />
  </BrowserRouter>
);
