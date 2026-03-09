import { Link, Outlet } from 'react-router-dom';

function FrontendLayout() {
    return(
        <>
            <header className="mb-3 bg-warning-subtle">
                <ul className="nav justify-content-center">
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/">首頁</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/product">產品列表</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/cart">購物車</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/checkout">結帳</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/login">登入</Link>
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

export default FrontendLayout;