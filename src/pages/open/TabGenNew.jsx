import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Wallet } from 'xrpl'
import TextInput from '../../components/Form/TextInput'

export default function TabGenNew() {
  const [newSeed, setNewSeed] = useState('')
  const [newAddress, setNewAddress] = useState('')

  const User = useSelector(state => state.User)

  const navigate = useNavigate()
  const dispatch = useDispatch()

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
    <div className="tab-page">
      <div className="p-2 rounded-lg shadow-xl mb-10">
        <div className="flex flex-col justify-center">
          <button
            onClick={genNewAccount}
            className="btn-primary"
          >
            Generate Account
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
  )
}