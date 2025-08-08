import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { submitActionStart } from '../../store/slices/UserSlice'
import TextInput from '../../components/Form/TextInput'
import FormError from '../../components/Form/FormError'
import LoadingDiv from '../../components/LoadingDiv'
import { TxType } from '../../Const'
import FormButton from '../../components/Form/FormButton'
import SubmitResult from '../../components/SubmitResult'

export default function TabDelete() {
  const { isLoading, loadingText, submitResult, error, TrustLineList, OfferList } = useSelector(state => state.User)

  const [dest, setDest] = useState('')

  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()
    let payload = {
      action: TxType.AccountDelete,
      dest: dest
    }
    dispatch(submitActionStart(payload))

    // reset
    setDest('')
  }

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col justify-evenly mx-auto w-full p-4 items-center border-2 border-indigo-500 rounded-lg">
        <div className="flex flex-col p-1">
          <LoadingDiv isLoading={isLoading} text={loadingText} />
          <div className="mx-auto flex flex-col mt-4">
            <div className="mx-auto rounded-full p-1 border-2 border-gray-200 dark:border-gray-700 px-4">
              <h1 className='text-4xl text-gray-500 dark:text-gray-200'>!!!Delete</h1>
            </div>

            {TrustLineList?.length === 0 && OfferList?.length === 0 ?
              <div className="min-w-full p-2 rounded-lg shadow-xl justify-center">
                <form className="max-w-4xl mx-auto flex flex-col items-center justify-start" onSubmit={handleSubmit}>
                  <div className={`mt-1`}>
                    <TextInput label={'Destination:'} placeholder={'r...destination...'} value={dest} onChange={(e) => setDest(e.target.value)} />
                  </div>
                  <div className={`mt-1`}>
                    <FormButton disabled={isLoading} title={'!!!Delete'} bgColor='bg-red-500 hover:bg-red-600' />
                  </div>
                </form>
                <FormError error={error} />
                <SubmitResult result={submitResult} />
              </div>
              :
              <div>
                make sure your account has no trusted asset and no offer...
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}