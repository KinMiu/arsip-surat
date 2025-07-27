import Navbar from '../components/Navbar/index'
import SidebarHomePage from "../components/Sidebar/Sidebar"

// eslint-disable-next-line react/prop-types
const Layout = ( {children} ) => {
  return(
    <div className="flex relative h-screen gap-2 overflow-hidden bg-gray-100 lg:p-2 ">
        <SidebarHomePage />
      <div className=" relative flex w-sc lg:w-[100%] flex-col overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-slate-100">
          <Navbar />
        <main className="md:px-0 w-full">{children}</main>
      </div>
    </div>
  )
}

export default Layout