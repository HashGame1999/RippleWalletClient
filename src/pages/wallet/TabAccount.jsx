import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { dropsToXrp } from 'xrpl'
import { DefaultCoinCode, TxType, WalletPageTab } from '../../Const'
import InternalButton from '../../components/InternalButton'
import LoadingDiv from '../../components/LoadingDiv'
import { resetSubmitResult, setActiveTabWallet, submitActionStart } from '../../store/slices/UserSlice'
import TableAsset from '../../components/TableAsset'

export default function TabAccount() {
  const [submitFlag, setSubmitFlag] = useState(false)

  const { connectionStatus } = useSelector(state => state.xrpl)
  const { address, isLoading, loadingText, submitResult, walletInfo, errorWalletInfo, TrustLineList, OfferList, activeTabWallet } = useSelector(state => state.User)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (address !== undefined && address !== null && activeTabWallet === WalletPageTab.Account) {
      dispatch({
        type: 'FetchWalletInfo'
      })
      dispatch({
        type: 'FetchTrustLineList'
      })
      dispatch({
        type: 'FetchOfferList'
      }
      )
    }
  }, [dispatch, address, activeTabWallet, connectionStatus])

  const delTrustLine = async (issuer, currency) => {
    setSubmitFlag(true)
    dispatch(submitActionStart({ action: TxType.TrustSet, issuer: issuer, currency: currency, amount: '0' }))
  }

  const cancelOffer = async (seq) => {
    setSubmitFlag(true)
    dispatch(submitActionStart({ action: TxType.OfferCancel, offer_sequence: seq }))
  }

  useEffect(() => {
    if (submitFlag && submitResult !== null) {
      setSubmitFlag(false)
      dispatch(resetSubmitResult())
      dispatch(setActiveTabWallet(WalletPageTab.Histroy))
    }
  }, [submitResult])

  return (
    <div className="flex justify-center items-center">
      <LoadingDiv isLoading={isLoading} text={loadingText} />
      {
        errorWalletInfo != null ?
          <div>
            <span className='text-3xl text-gray-800 dark:text-gray-200'>
              {errorWalletInfo}
            </span>
          </div>
          :
          (walletInfo &&
            <div>

              <div>
                <table className="table-auto border-collapse border border-gray-400">
                  <thead>
                    <tr>
                      <th className="border border-gray-400 p-2">
                        <span className='text-3xl text-gray-800 dark:text-gray-200'>
                          Asset
                        </span>
                      </th>
                      <th className="border border-gray-400 p-2">
                        <span className='text-3xl text-gray-800 dark:text-gray-200'>
                          Balance
                        </span>
                      </th>
                      <th className="border border-gray-400 p-2">
                        <span className='text-3xl text-gray-800 dark:text-gray-200'>
                          Limit
                        </span>
                      </th>
                      <th className="border border-gray-400 p-2">
                        <span className='text-3xl text-gray-800 dark:text-gray-200'>
                          Action
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr key={-1}>
                      <td className="border border-gray-400 p-2">
                        <div className='flex flex-col items-center justify-center'>
                          <span className='text-3xl text-gray-800 dark:text-gray-200'>
                            {DefaultCoinCode}
                          </span>
                        </div>
                      </td>
                      <td className="border border-gray-400 p-2">
                        <span className='text-3xl text-gray-800 dark:text-gray-200'>
                          {dropsToXrp(walletInfo.account_data.Balance)}
                        </span>
                      </td>
                      <td className="border border-gray-400 p-2"></td>
                    </tr>
                    {TrustLineList?.length > 0 && TrustLineList.map((line, index) => (
                      <tr key={index}>
                        <td className="border border-gray-400 p-2">
                          <div className='flex flex-col items-center justify-center'>
                            <span className='text-3xl text-gray-800 dark:text-gray-200'>
                              {line.currency}
                            </span>
                            <span className='text-xs text-gray-800 dark:text-gray-200'>
                              {line.account}
                            </span>
                          </div>
                        </td>
                        <td className="border border-gray-400 p-2">
                          <span className='text-3xl text-gray-800 dark:text-gray-200'>
                            {line.balance}
                          </span>
                        </td>
                        <td className="border border-gray-400 p-2">
                          <span className='text-3xl text-gray-800 dark:text-gray-200'>
                            {line.limit}
                          </span>
                        </td>
                        <td className="border border-gray-400 p-2">
                          {
                            parseFloat(line.balance) === 0 &&
                            <InternalButton title={`Delete`} onClick={() => { delTrustLine(line.account, line.currency) }} text_size={"text-base"} />
                          }
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {
                OfferList && OfferList.length > 0 &&
                <div className='mt-4'>
                  <table className="table-auto border-collapse border border-gray-400">
                    <thead>
                      <tr>
                        <th className="border border-gray-400 p-2">
                          <span className='text-3xl text-gray-800 dark:text-gray-200'>
                            Sequence
                          </span>
                        </th>
                        <th className="border border-gray-400 p-2">
                          <span className='text-3xl text-gray-800 dark:text-gray-200'>
                            Pay
                          </span>
                        </th>
                        <th className="border border-gray-400 p-2">
                          <span className='text-3xl text-gray-800 dark:text-gray-200'>
                            Get
                          </span>
                        </th>
                        <th className="border border-gray-400 p-2">
                          <span className='text-3xl text-gray-800 dark:text-gray-200'>
                            Action
                          </span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {OfferList.map((offer, index) => (
                        <tr key={index}>
                          <td className="border border-gray-400 p-2">
                            <div className='flex flex-col items-center justify-center'>
                              <span className='text-3xl text-gray-800 dark:text-gray-200'>
                                {offer.seq}
                              </span>
                            </div>
                          </td>
                          <td className="border border-gray-400 p-2">
                            <TableAsset asset={offer.taker_pays} textSize={'text-3xl'} />
                          </td>
                          <td className="border border-gray-400 p-2">
                            <TableAsset asset={offer.taker_gets} textSize={'text-3xl'} />
                          </td>
                          <td className="border border-gray-400 p-2">
                            <InternalButton title={`Cancel`} onClick={() => { cancelOffer(offer.seq) }} text_size={"text-base"} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              }
            </div>
          )
      }
    </div>
  )
}