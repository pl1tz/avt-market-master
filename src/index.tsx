import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.scss';
import { About } from './pages/about/About';
import { About as AboutAdmin } from './componentsAdmin/about/About';
import { Admin } from './componentsAdmin/Admin';
import { Authorization } from './componentsAdmin/authorization/Authorization';
import { Banks } from './pages/banks/Banks';
import { Banks as BanksAdmin } from './componentsAdmin/banks/Banks';
import { Buyout } from './pages/buyout/Buyout';
import { Categories } from './componentsAdmin/categories/Categories';
import { Car } from './pages/car/Car';
import { CarAdd } from './componentsAdmin/carAdd/CarAdd';
import { CarEditComplectation } from './componentsAdmin/carEditComplectation/CarEditComplectation';
import { CarEditHistory } from './componentsAdmin/carEditHistory/CarEditHistory';
import { CarEditMainInfo } from './componentsAdmin/carEditMainInfo/CarEditMainInfo';
import { CarLayout } from './componentsAdmin/carLayout/CarLayout';
import { Cars } from './pages/cars/Cars';
import { Cars as CarsAdmin } from './componentsAdmin/cars/Cars';
import { Contacts } from './pages/contacts/Contacts';
import { Contacts as ContactsAdmin } from './componentsAdmin/contacts/Contacts';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Navigate } from 'react-router-dom';
import { Credit } from './pages/credit/Credit';
import { Error } from './pages/error/Error';
import { ErrorBoundary } from 'react-error-boundary';
import { Exchange } from './pages/exchange/Exchange';
import { Favorites } from './pages/favorites/Favorites';
import { Home } from './pages/home/Home';
import { Installment } from './pages/installment/Installment';
import { Layout } from './components/layout/Layout';
import { Layout as LayoutAdmin } from './componentsAdmin/layout/Layout';
import { Orders } from './componentsAdmin/orders/Orders';
import { Privacy } from './pages/privacy/Privacy';
import { Provider } from 'react-redux';
import { Programs as ProgramsAdmin } from './componentsAdmin/programs/Programs';
import { store } from './redux/store';
import { Success } from './pages/success/Success';
import { CarEditImages } from './componentsAdmin/carEditImages/CarEditImages';

const root = ReactDOM.createRoot(document.getElementById('root')!);
const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} errorElement={<Error />} />
                <Route path="cars">
                    <Route index element={<Cars />} />
                    <Route path=":brand" element={<Cars />} />
                    <Route path=":brand/:model" element={<Cars />} />
                    <Route path=":brand/:model/:generation" element={<Cars />} />
                </Route>
                <Route path="car/:brand/:id" element={<Car />} />
                <Route path="credit">
                    <Route index element={<Credit />} />
                    <Route path=":bank" element={<Credit />} />
                </Route>
                <Route path="installment" element={<Installment />} />
                <Route path="buyout" element={<Buyout />} />
                <Route path="exchange" element={<Exchange />} />
                <Route path="banks" element={<Banks />} />
                <Route path="contacts" element={<Contacts />} />
                <Route path="about" element={<About />} />
                <Route path="privacy" element={<Privacy />} />
                <Route path="error" element={<Error />} />
                <Route path="favorites" element={<Favorites />} />
                <Route path="success" element={<Success />} />
                <Route path="*" element={<Navigate to={'error'} state={{ message: 'Страница не найдена' }} />} />
            </Route>
            <Route path="/admin" element={<Admin />}>
                <Route index element={<Authorization />} />
                <Route element={<LayoutAdmin />}>
                    <Route path="cars" element={<CarsAdmin />} />
                    <Route path="car/:id" element={<CarLayout />}>
                        <Route index element={<CarEditMainInfo />} />
                        <Route path="history" element={<CarEditHistory />} />
                        <Route path="complectation" element={<CarEditComplectation />} />
                        <Route path="images" element={<CarEditImages />} />
                    </Route>
                    <Route path="categories" element={<Categories />} />
                    <Route path="add_car" element={<CarAdd />} />
                    <Route path="banks" element={<BanksAdmin />} />
                    <Route path="programs" element={<ProgramsAdmin />} />
                    <Route path="contacts" element={<ContactsAdmin />} />
                    <Route path="about" element={<AboutAdmin />} />
                    <Route path="orders" element={<Orders />} />
                </Route>
            </Route>
        </Route>,
    ),
);

root.render(
    <React.StrictMode>
        <ErrorBoundary
            fallbackRender={({ error, resetErrorBoundary }) => (
                <Error error={error} resetErrorBoundary={resetErrorBoundary} />
            )}
        >
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
        </ErrorBoundary>
    </React.StrictMode>,
);
