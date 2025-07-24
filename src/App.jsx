import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import PortalPage from './pages/PortalPage'
import AboutPage from './pages/AboutPage'
import LoginPage from './pages/LoginPage'
import WalletPage from './pages/WalletPage'
import SettingsPage from './pages/Settings'

import NavBarIconLink from './components/NavBarIconLink'
import NavBarIconButton from './components/NavBarIconButton'
import ExternalLink from './components/ExternalLink'
import InternalLink from './components/InternalLink'

import { useLocalStorage } from './hooks/useLocalStorage'
import { updateIsExplicitDisconnect } from './store/slices/xrplSlice'
import { loginStart, logout } from './store/slices/UserSlice'

import { TbCurrencyXrp } from "react-icons/tb"
import { IoSearchOutline, IoGameControllerOutline, IoSettingsOutline } from "react-icons/io5"
import { FiSun, FiMoon, FiLogOut, FiLogIn } from "react-icons/fi"
import { HiOutlineStatusOnline, HiOutlineStatusOffline } from "react-icons/hi"

function App() {
  const [isDark, setIsDark] = useLocalStorage('isDark', false)

  const { connectionStatus, latestLedger } = useSelector(state => state.xrpl)
  const User = useSelector(state => state.User)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // route
  const location = useLocation()
  const UnAuthPaths = ['/login']
  const AuthPaths = ['/wallet', '/console']
  const GeneralPaths = ['/', '/theme', '/about', '/histroy', '/settings', '/check', '/draw']
  useEffect(() => {
    let isGeneralPath = GeneralPaths.includes(location.pathname)
    let isAuthPaths = AuthPaths.includes(location.pathname)
    let isUnAuthPaths = UnAuthPaths.includes(location.pathname)
    const localSeed = localStorage.getItem("Seed")
    const localAddress = localStorage.getItem("Address")

    if (!User.isAuth && localSeed) {
      dispatch(loginStart({ seed: localSeed, address: localAddress }))
    }

    if (isGeneralPath) {
      return
    } else if (localAddress && isUnAuthPaths) {
      navigate('/wallet')
    } else if (!localAddress && isAuthPaths) {
      navigate('/login')
    }
  }, [navigate])

  const walletLogout = () => {
    console.log('walletLogout')
    localStorage.removeItem('Seed')
    localStorage.removeItem('Address')
    dispatch(logout())
    navigate('/')
  }

  // xrpl
  const doConnect = async () => {
    if (!connectionStatus) {
      try {
        dispatch(updateIsExplicitDisconnect(false))
        dispatch({ type: 'ConnectXRPL' })
      } catch (error) {
        console.error('connecting:', error)
      }
    }
  }

  const doDisconnect = async () => {
    if (connectionStatus) {
      try {
        dispatch(updateIsExplicitDisconnect(true))
        dispatch({ type: 'DisconnectXRPL' })
      } catch (error) {
        console.error('disconnecting:', error)
      }
    }
  }

  // theme
  const toggleTheme = () => {
    const newIsDark = !isDark
    setIsDark(newIsDark)
    document.documentElement.classList.toggle('dark', newIsDark)
    localStorage.setItem('theme', newIsDark ? 'dark' : 'light')
  }

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const initialTheme = savedTheme || (systemDark ? 'dark' : 'light')
    setIsDark(initialTheme === 'dark')
    document.documentElement.classList.toggle('dark', initialTheme === 'dark')
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-gray-300 dark:bg-gray-900">
      <nav className="h-16 fixed w-full z-10 bg-green-200 dark:bg-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <InternalLink path={"/"} title={"RippleWallet"} text_size={"text-2xl"} />
              <button
                onClick={() => connectionStatus ? doDisconnect() : doConnect()}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 flex flex-col items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
              >
                {connectionStatus ?
                  <HiOutlineStatusOnline className="h-6 w-6 text-green-600 dark:text-green-400" />
                  :
                  <HiOutlineStatusOffline className="h-6 w-6 text-red-600 dark:text-red-400" />}
                {latestLedger !== null &&
                  <span className="text-xs text-gray-800 dark:text-gray-200">
                    {latestLedger.ledger_index}
                  </span>}
              </button>
              <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">
                {isDark ?
                  <FiSun className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  :
                  <FiMoon className="h-6 w-6 text-blue-600 dark:text-blue-400" />}
              </button>
            </div>

            <div className="hidden md:flex space-x-2">
              {
                User.isAuth ?
                  <div className="flex flex-row items-center">
                    <span className="text-gray-700 dark:text-gray-300 pl-4">
                      {User.address}
                    </span>
                    <NavBarIconLink
                      path="/wallet"
                      icon={<TbCurrencyXrp className="h-6 w-6 text-blue-600 dark:text-blue-400" />}
                      label="Wallet"
                    />
                    <NavBarIconButton
                      icon={<FiLogOut className="h-6 w-6 text-blue-600 dark:text-blue-400" />}
                      label="Logout"
                      onClick={walletLogout}
                    />
                  </div>
                  :
                  <div className="flex flex-row items-center">
                    <NavBarIconLink
                      path="/settings"
                      icon={<IoSettingsOutline className="h-6 w-6 text-blue-600 dark:text-blue-400" />}
                      label="Settings"
                    />
                    <NavBarIconLink
                      path="/login"
                      icon={<FiLogIn className="h-6 w-6 text-blue-600 dark:text-blue-400" />}
                      label="Login"
                    />
                  </div>
              }
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        <div className="mx-auto max-w-6xl pt-16">
          <div className="p-2 rounded-lg">
            <Routes>
              {/* general */}
              <Route path="/" element={<PortalPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/settings" element={<SettingsPage />} />

              {/* unAuth */}
              <Route path="/login" element={<LoginPage />} />

              {/* auth */}
              <Route path="/wallet" element={<WalletPage />} />
            </Routes>
          </div>
        </div>
      </main>

      <footer className="mt-auto flex-none bg-green-200 dark:bg-gray-800 shadow-lg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <ExternalLink href={"https://github.com/HashGame1999/RippleWallet"} title={"RippleWallet"} text_size={"text-base"} />
            <div className="flex space-x-4">
              <InternalLink path={"/about"} title={"About"} text_size={"text-base"} />
            </div>
          </div>
        </div>
      </footer>
    </div >
  )
}

export default App