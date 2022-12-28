import './App.css';
import Cart from './pages/cart';
import Checkout from './pages/checkout';
import NotFound from './pages/error/NotFound';
import Home from './pages/home';
import Inventory from './pages/inventory';
import Transactions from './pages/transactions';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from './layout';

function App() {
  return (
		<Router>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route
							index
							element={<Home/>}
						/>
						<Route
							path="cart"
							exact
							element={<Cart />}
						/>
						<Route
							path="checkout"
							exact
							element={<Checkout />}
						/>
            <Route
							path="inventory"
							exact
							element={<Inventory />}
						/>
            <Route
							path="transactions"
							exact
							element={<Transactions />}
						/>
						<Route
							path="*"
							exact
							element={<NotFound />}
						/>
					</Route>
				</Routes>
		</Router>
	);
}

export default App;
