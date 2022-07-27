import {BrowserRouter,Route} from 'react-router-dom';
import Header from './components/Header';
import ShowExpenseList from './components/ShowExpenseList';
import ExpenseTracker from './components/ExpenseTracker';

function App() {
  return (
    <div>
     <BrowserRouter>
      <Route path="/" exact><Header /></Route>
   <Route path="/" exact> <ShowExpenseList /></Route>
     <Route path="/add" exact> <ExpenseTracker onClose={ () => false} onTrue={() => {}}/></Route>  
     </BrowserRouter> 
    </div>
  );
}

export default App;
