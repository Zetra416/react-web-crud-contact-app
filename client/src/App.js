import './App.css';
import ContactList from './components/ContactList';
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <div className="header">
          <ContactList title="Contact List"/>
        </div>
      </div>
    </Provider>
  );
}

export default App;
