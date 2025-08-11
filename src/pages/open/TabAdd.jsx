import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginStart, setUserError } from '../../store/slices/UserSlice'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { encryptWithPassword, genSalt, getWallet } from '../../Util'
import { MainNetURL } from '../../Const'
import TextInput from '../../components/Form/TextInput'

export default function TabAdd() {
  const [ServerURL, setServerURL] = useLocalStorage('ServerURL', MainNetURL)
  const [accountList, setAccountList] = useLocalStorage('AccountList', '')
  const [seed, setSeed] = useLocalStorage('Seed', '')
  const [address, setAddress] = useLocalStorage('Address', '')

  const [nickname, setNickname] = useState('')
  const [savePassword, setSavePassword] = useState('')
  const [saveSeed, setSaveSeed] = useState('')
  const [saveAddress, setSaveAddress] = useState('')

  const User = useSelector(state => state.User)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const updateSeed = (value) => {
    value = value.trim()
    setSaveSeed(value)
    setSaveAddress('')
    dispatch(setUserError(null))

    if (value !== '') {
      try {
        let wallet = getWallet(value, ServerURL)
        setSaveAddress(wallet.classicAddress)
      } catch (error) {
        console.log(error)
        dispatch(setUserError(error.message))
      }
    }
  }

  const addAccount = async () => {
    const salt = genSalt()
    let cipherData = encryptWithPassword(saveSeed, savePassword, salt)
    let account_json = { nickname: nickname, address: saveAddress, salt: salt, cd: cipherData }
    let tmp = []
    if (accountList !== '') {
      tmp = JSON.parse(accountList)
    }
    tmp = tmp.filter(a => a.address !== saveAddress)
    tmp.push(account_json)
    setAccountList(JSON.stringify(tmp))
    setNickname('')
    setSavePassword('')
    setSaveSeed('')
    if (User.error === null && saveSeed !== '') {
      setSeed(saveSeed)
      setAddress(saveAddress)
      dispatch(loginStart({ seed: saveSeed, address: saveAddress }))
    }
  }

  useEffect(() => {
    if (User.isAuth) {
      navigate('/wallet')
    }
  }, [User])

  return (
    <div className="tab-page">
      {
        User.seed === null &&
        <div className="p-6 rounded-lg shadow-xl mb-10">
          <div className="space-y-4 flex flex-col justify-center">
            <div className={`mt-1`}>
              <TextInput label={'Nick Name:'} value={nickname} autoComplete={"off"} placeholder={"Alice"} onChange={(e) => setNickname(e.target.value)} />
            </div>
            <div className={`mt-1`}>
              <TextInput label={'Password:'} type='password' value={savePassword} autoComplete={"off"} placeholder={"........"} onChange={(e) => setSavePassword(e.target.value)} />
            </div>
            <div className={`mt-1`}>
              <TextInput label={'Your Seed:'} type='password' value={saveSeed} autoComplete={"off"} placeholder={"s.................................."} onChange={(e) => updateSeed(e.target.value)} />
            </div>
            <div className={`mt-1 ${saveSeed === '' ? 'hidden' : ''}`}>
              <TextInput label={'Address:'} value={saveAddress} disabled={true} autoComplete={"off"} placeholder={"r.................................."} />
            </div>
            <button
              onClick={addAccount}
              disabled={saveSeed === '' || nickname.trim() === '' || savePassword.trim() === ''}
              className="btn-primary"
            >
              Add Account
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
    </div>
  )
}