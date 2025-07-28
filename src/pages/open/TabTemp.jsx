import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginStart, setUserError } from '../../store/slices/UserSlice'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { getWallet } from '../../Util'
import { MainNetURL } from '../../Const'
import TextInput from '../../components/Form/TextInput'

export default function TabTemp() {
  const [seed, setSeed] = useLocalStorage('Seed', '')
  const [address, setAddress] = useLocalStorage('Address', '')
  const [ServerURL, setServerURL] = useLocalStorage('ServerURL', MainNetURL)

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
        dispatch(loginStart({ seed: value, address: wallet.classicAddress }))
      } catch (error) {
        console.log(error)
        dispatch(setUserError(error.message))
      }
    }
  }

  useEffect(() => {
    if (User.isAuth) {
      navigate('/wallet')
    }
  }, [User])

  return (
    <div className="flex flex-col justify-evenly mx-auto w-full p-4 items-center border-2 border-indigo-500 rounded-lg">
      {
        User.seed === null &&
        <div className="p-6 rounded-lg shadow-xl mb-10">
          <div className="space-y-4 flex flex-col justify-center">
            <div className={`mt-1`}>
              <TextInput label={'Your Seed:'} type='password' value={seed} autoComplete={"off"} placeholder={"s.................................."} onChange={(e) => updateSeed(e.target.value)} />
            </div>
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
    </div>
  )
}