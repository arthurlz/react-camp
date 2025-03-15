import { useState, lazy } from "react";
import { Link, Navigate, Outlet, Routes, Route } from "react-router"
import { Bookshelf } from "./Bookshelf";

type AuthUser = {
  id: string;
  name: string;
  permissions: string[];
  roles: string[];
}

type ProtectedRouteProps = {
  isAllowed: boolean;
  redirectPath?: string;
  children?: React.ReactNode
}

const ProtectedRoute =({
  isAllowed,
  redirectPath = '/',
  children
}: ProtectedRouteProps) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }
  return children ? <>{children}</> : <Outlet />;
}

const Landing = () => {
  return <h2>Landing(public: 谁都可以看见)</h2>
}

const Home = () => {
  return (
    <>
      <Link to={{
        pathname: '/bookshelf',
        search: "?title=road&isCompleted=true"
      }}  className="nav-router-link">Go to Bookshelf</Link>
      <h2>Home(protected: 登录过的用户才能看见)</h2>
    </>
  )
}

const Dashboard = () => {
  return (
    <>
    <h2>Dashboard(protected: 登录过的用户才能看见)</h2>
    </>
  )
}
// loading-component
const Analytics = lazy(() => import('./Analytics'));

const Admin = () => {
  return (
    <h2>Admin(protected: role admin才可以看见</h2>
  )
}



const Navigation = () => {
  return (<nav className="flex gap-4 mb-4">
    <Link to='/' className="nav-router-link">
      Landing
    </Link>
    <Link to="home" className="nav-router-link">
      Home
    </Link>
    <Link to="dashboard" className="nav-router-link">
      Dashboard
    </Link>
    <Link to="analytics" className="nav-router-link">
      Analytics
    </Link>
    <Link to="admin" className="nav-router-link">
      Admin
    </Link>
  </nav>
  )
}

function RouterApp() {
  const [user, setUser] = useState<AuthUser | null>(null)

  const handleLogin = () => {
    setUser({
      id: '1',
      name: 'Jack',
      permissions: ['analyze'],
      roles: ['admin']
    })
  }

  const handleLogout = () => setUser(null)

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white mt-8 rounded-md shadow-md">
      <h1 className="mb-4 text-center">React router demo</h1>

      <Navigation />

      <div className="flex items-center gap-4 mb-4">
        {
          user ? (
            <>
              <span className="font-semibold text-gray-600">Hi, {user.name}</span>
              <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-500" onClick={handleLogout}>Sign out</button>
            </>
          )
          :
          (
            <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-500" onClick={handleLogin}>Sign in</button>
          )
        }
      </div>

      <Routes>
        <Route index element={<Landing />} />
        
        <Route element={<ProtectedRoute isAllowed={!!user} />}>
          <Route path="home" element={<Home />}></Route>
          <Route path="dashboard" element={<Dashboard />}></Route>
        </Route>

        <Route
          path="analytics"
          element={
            <ProtectedRoute isAllowed={!!user && user.permissions.includes('analyze')}>
              <Analytics />
            </ProtectedRoute>
          }
        />

        <Route
          path="admin"
          element={
            <ProtectedRoute isAllowed={!!user && user.permissions.includes('admin')}>
              <Admin />
            </ProtectedRoute>
          }
        />

        <Route path="bookshelf" element={<Bookshelf />} />
        
        <Route path='*' element={<p>什么都没有404!</p>} />

      </Routes>

    </div>
  )
}

export default RouterApp;
