import ReactDOM from 'react-dom/client';
import App from './Components/App';
import { BrowserRouter, Route } from 'react-router-dom';

let rootElm = document.getElementById('root');

ReactDOM.createRoot(rootElm).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
