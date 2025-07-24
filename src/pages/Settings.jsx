import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { MainNetURL, ServerOptions } from '../Const'
import SelectInput from '../components/Form/SelectInput'

export default function SettingsPage() {
  const [serverURL, setServerURL] = useLocalStorage('ServerURL', MainNetURL)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleServer = (value) => {
    setServerURL(value)
    dispatch({ type: 'DisconnectXRPL' })
  }

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col justify-evenly mx-auto w-full p-4 items-center border-2 border-indigo-500 rounded-lg">
        <div className="mx-auto flex flex-col mt-4">
          <div className="mx-auto rounded-full p-1 border-2 border-gray-200 dark:border-gray-700 px-4">
            <h1 className='text-4xl text-gray-500 dark:text-gray-200'>Network</h1>
          </div>
          <div className="min-w-full p-2 rounded-lg shadow-xl justify-center">
            <div className="mx-auto space-y-2">
              <SelectInput label={'Server:'} options={ServerOptions} selectdOption={serverURL} onChange={(e) => handleServer(e.target.value)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}