import { Link, Outlet } from 'react-router-dom';

function FrontendLayout() {
    return(
        <>
            <header className="mb-3">
                <ul className="nav justify-content-center ">
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/">首頁</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/product">產品列表</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/cart">購物車</Link>
                    </li>
                </ul>
            </header>
            <main>
                <Outlet />
            </main>
            <footer className="mt-5 text-center">
                <p>第五周作業</p>
            </footer>
        </>
    )
}

export default FrontendLayout;