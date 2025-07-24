import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginStart, setUserError } from '../store/slices/UserSlice'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { Wallet } from 'xrpl'
import TextInput from '../components/Form/TextInput'
import { getWallet } from '../Util'
import { labelStyle, MainNetURL } from '../Const'

export default function LoginPage() {
  const [seed, setSeed] = useLocalStorage('Seed', '')
  const [address, setAddress] = useLocalStorage('Address', '')
  const [ServerURL, setServerURL] = useLocalStorage('ServerURL', MainNetURL)

  const [newSeed, setNewSeed] = useState('')
  const [newAddress, setNewAddress] = useState('')

  const User = useSelector(state => state.User)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const updateSeed = (value) => {
    value = value.trim()
    setSeed(value)
    setAddress('')
    dispatch(setUserError(null))

    if (value !== '') {
      try {
        let wallet = getWallet(value, ServerURL)
        setAddress(wallet.classicAddress)
      } catch (error) {
        console.log(error)
        dispatch(setUserError(error.message))
      }
    }
  }

  const login = async () => {
    if (User.error === null && seed !== '') {
      dispatch(loginStart({ seed: seed, address: address }))
    }
  }

  const genNewAccount = async () => {
    const wallet = Wallet.generate()
    setNewSeed(wallet.seed)
    setNewAddress(wallet.classicAddress)
  }

  useEffect(() => {
    if (User.isAuth) {
      navigate('/wallet')
    }
  }, [User])

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col justify-evenly mx-auto w-full p-4 items-center border-2 border-indigo-500 rounded-lg">
        {
          User.seed === null &&
          <div className="p-6 rounded-lg shadow-xl mb-10">
            <div className="space-y-4 flex flex-col justify-center">
              <div className={`mt-1`}>
                <TextInput label={'Your Seed:'} value={seed} autoComplete={"off"} placeholder={"s.................................."} onChange={(e) => updateSeed(e.target.value)} />
              </div>
              <div className={`mt-1 ${seed === '' ? 'hidden' : ''}`}>
                <TextInput label={'Address:'} value={address} disabled={true} autoComplete={"off"} placeholder={"r.................................."} />
              </div>
              <button
                onClick={login}
                disabled={address === ''}
                className="w-96 py-2 text-3xl font-bold bg-green-500 text-white rounded hover:bg-green-600"
              >
                Use
              </button>
            </div>
          </div>
        }
        {
          User.error !== null &&
          <div className="p-6 rounded-lg shadow-xl w-96 mb-5">
            <span className='text-3xl font-bold inline-block w-full break-words text-red-800 dark:text-red-200'>
              {User.error}
            </span>
          </div>
        }
        <div className="p-2 rounded-lg shadow-xl mb-10">
          <div className="flex flex-col justify-center">
            <label className={`${labelStyle} text-center`}>
              Or
            </label>
            <button
              onClick={genNewAccount}
              className="w-96 py-2 text-3xl font-bold bg-green-500 text-white rounded hover:bg-green-600"
            >
              Gen a New Account
            </button>
            <div className={`mt-2 ${newSeed === '' ? 'hidden' : ''}`}>
              <TextInput label={'Seed:'} value={newSeed} disabled={true} />
            </div>
            <div className={`mt-2 ${newAddress === '' ? 'hidden' : ''}`}>
              <TextInput label={'Address:'} value={newAddress} disabled={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}