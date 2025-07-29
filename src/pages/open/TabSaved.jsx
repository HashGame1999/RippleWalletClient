import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginStart, setUserError } from '../../store/slices/UserSlice'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { decryptWithPassword } from '../../Util'
import TextInput from '../../components/Form/TextInput'
import SelectInput from '../../components/Form/SelectInput'

export default function TabSaved() {
  const [accountList, setAccountList] = useLocalStorage('AccountList', '')
  const [seed, setSeed] = useLocalStorage('Seed', '')
  const [address, setAddress] = useLocalStorage('Address', '')

  const [addressOptions, setAddressOptions] = useState([])
  const [addressSelectd, setAddressSelectd] = useState('')
  const [openPassword, setOpenPassword] = useState('')

  const User = useSelector(state => state.User)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const login = async () => {
    let tmp = []
    if (accountList !== '') {
      tmp = JSON.parse(accountList)
    }
    let account_json = tmp?.find(a => a.address === addressSelectd)
    try {
      let tmpSeed = decryptWithPassword(account_json.cd, openPassword, account_json.salt)
      if (User.error === null && tmpSeed !== '') {
        setSeed(tmpSeed)
        setAddress(addressSelectd)
        dispatch(loginStart({ seed: seed, address: addressSelectd }))
      }
    } catch (error) {
      console.log(error)
      setUserError(error)
    }
  }

  useEffect(() => {
    setAddressSelectd('')
    let tmp = []
    if (accountList !== '') {
      tmp = JSON.parse(accountList)
    }
    let options = []
    for (let i = 0; i < tmp.length; i++) {
      const account = tmp[i];
      options.push({ value: account.address, label: account.nickname })
    }
    setAddressOptions(options)
    if (options.length > 0) {
      setAddressSelectd(options[0].value)
    }
  }, [accountList])

  useEffect(() => {
    if (User.isAuth) {
      navigate('/wallet')
    }
  }, [User])

  const delAccount = async () => {
    let tmp = []
    if (accountList !== '') {
      tmp = JSON.parse(accountList)
    }
    tmp = tmp.filter(a => a.address !== addressSelectd)
    setAccountList(JSON.stringify(tmp))
  }

  return (
    <div className="flex flex-col justify-evenly mx-auto w-full p-4 items-center border-2 border-indigo-500 rounded-lg">
      {
        addressSelectd !== '' ?
          <div className="p-6 rounded-lg shadow-xl mb-10">
            <div className="space-y-4 flex flex-col justify-center">
              <div className={`mt-1`}>
                <SelectInput label={'Nickname:'} options={addressOptions} selectdOption={addressSelectd} onChange={(e) => setAddressSelectd(e.target.value)} />
              </div>
              <div className={`mt-1`}>
                <TextInput label={'Password:'} type='password' value={openPassword} autoComplete={"off"} placeholder={"........"} onChange={(e) => setOpenPassword(e.target.value)} />
              </div>
              <button
                onClick={login}
                className={`w-96 py-2 text-3xl font-bold bg-green-500 text-white rounded hover:bg-green-600`}
              >
                Open Account
              </button>
              <button
                onClick={delAccount}
                className={`w-96 py-2 text-3xl font-bold bg-yellow-500 text-white rounded hover:bg-yellow-600`}
              >
                Remove Account
              </button>
            </div>
          </div>
          :
          <div>
            no saved account
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