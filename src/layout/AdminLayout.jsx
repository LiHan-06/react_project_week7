import { Link, Outlet } from 'react-router-dom';

function AdminLayout() {
    return(
        <>
            <header className="mb-3 bg-warning-subtle">
                <ul className="nav justify-content-center">
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/admin/product">後台產品列表</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/admin/order">後台訂單列表</Link>
                    </li>
                </ul>
            </header>
            <main>
                <Outlet />
            </main>
            <footer className="mt-5 text-center bg-warning-subtle">
                <p>第七周作業</p>
            </footer>
        </>
    )
}

export default AdminLayout;