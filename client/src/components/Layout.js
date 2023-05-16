import { Outlet } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"
const Layout = () => {
  return (
    <div style={{backgroundColor: 'rgba(235, 235, 235, 0.4)'}}>
        <Header/>
        <>
        <Outlet/>
        </>
        <Footer/>
    </div>
  )
}

export default Layout