import Dexie from 'dexie'
import { call, put, takeLatest, select, delay } from 'redux-saga/effects'
import { loginStart, loginSuccess, loginFailure, logout, updateWalletInfo, updateTrustLineList, clearWallet, loadHistroyTxsStart, loadHistroyTxsSuccess, loadIssuerCurrencyListStart, loadIssuerCurrencyListSuccess, submitActionStart, submitActionSuccess, loadSendCurrencyListStart, loadSendCurrencyListSuccess, updateOfferList, loadConvertPathStart, loadConvertPathSuccess } from '../slices/UserSlice'
import { fetchAccountInfo, fetchAccountLines, subscribeUserAccount, fetchAccountTxs, fetchIssuerCurrencyList, submitTrustSet, submitPayment, submitOfferCreate, fetchAccountOffers, submitOfferCancel, fetchOfferBook, submitAccountDelete, fetchConvertPath, submitPathPayment } from './xrplSaga'
import { formatMemo, safeAddItem } from '../../Util'
import { DefaultCoinCode, DefaultCoinIssuer, TxResult, TxType } from '../../Const'
import { convertHexToString } from 'xrpl'

let db = null

function initDB(db_name) {
  db = new Dexie(db_name)
  db.version(1).stores({
    Txs: `Hash&, LedgerIndex, Sequence, TxIndex, TxType, TxResult, Fee, TxDate, SourAccount, DestAccount, Issuer, Currency, DeliveredAmount, Memo, close_time_iso, json, [LedgerIndex+TxIndex]`,
  })
}

function* handleLogin(action) {
  yield put(loginSuccess({ seed: action.payload.seed, address: action.payload.address }))
  yield call(subscribeUserAccount, { address: action.payload.address })
}

function* handleLogout() {
  try {
    db = null
    yield put(clearWallet())
  } catch (error) {
    yield put(loginFailure(error.message))
  }
}

export function* fetchWalletInfo() {
  const address = yield select(state => state.User.address)
  let result = yield call(fetchAccountInfo, { address: address })
  yield put(updateWalletInfo(result))
}

export function* fetchTrustLineList() {
  const address = yield select(state => state.User.address)
  let result = yield call(fetchAccountLines, { address: address })
  if (result.error === null) {
  }
  yield put(updateTrustLineList(result))
}

export function* fetchOfferList() {
  const address = yield select(state => state.User.address)
  let result = yield call(fetchAccountOffers, { address: address })
  yield put(updateOfferList(result))
}

function* handelLoadHistroyTxs() {
  const address = yield select(state => state.User.address)
  if (address) {
    if (db === null) {
      yield call(initDB, address)
    }
    let txs = yield call(() => db.Txs
      .orderBy('[LedgerIndex+TxIndex]')
      .reverse()
      .toArray())
    yield put(loadHistroyTxsSuccess({ txs: txs }))
  }
}

export function* fetchTxHistroy() {
  const address = yield select(state => state.User.address)
  if (address) {
    if (db === null) {
      yield call(initDB, address)
    }

    const last_tx = yield call(() => db.Txs
      .orderBy('[LedgerIndex+TxIndex]')
      .reverse()
      .limit(1)
      .first())

    let txs = []
    if (last_tx === undefined) {
      txs = yield call(fetchAccountTxs, { account: address })
    } else {
      txs = yield call(fetchAccountTxs, { account: address, ledger_index_min: last_tx.LedgerIndex + 1 })
    }

    let insert_count = 0
    for (let i = 0; i < txs.length; i++) {
      const tx = txs[i]
      let tmp_tx = {
        Hash: tx.hash,
        LedgerIndex: tx.ledger_index,
        Sequence: tx.tx_json.Sequence,
        TxIndex: tx.meta.TransactionIndex,
        TxType: tx.tx_json.TransactionType,
        TxResult: tx.meta.TransactionResult,
        Fee: tx.tx_json.Fee,
        TxDate: tx.tx_json.date,
        close_time_iso: tx.close_time_iso,
        json: tx
      }
      if (tmp_tx.TxType === TxType.Payment && tmp_tx.TxResult === TxResult.Success) {
        tmp_tx.SourAccount = tx.tx_json.Account
        tmp_tx.DestAccount = tx.tx_json.Destination
        if (tx.meta.delivered_amount === "unavailable") {
          tmp_tx.DeliveredAmount = tx.tx_json.DeliverMax
          tmp_tx.Issuer = DefaultCoinIssuer
          tmp_tx.Currency = DefaultCoinCode
        } else if (typeof tx.meta.delivered_amount !== 'string') {
          tmp_tx.DeliveredAmount = tx.meta.delivered_amount.value
          tmp_tx.Issuer = tx.meta.delivered_amount.issuer
          tmp_tx.Currency = tx.meta.delivered_amount.currency
          if (tmp_tx.Currency.length > 3) {
            tmp_tx.Currency = tmp_tx.Currency.replace(/(00)+$/, '')
            tmp_tx.Currency = convertHexToString(tmp_tx.Currency)
          }
        } else {
          tmp_tx.DeliveredAmount = tx.meta.delivered_amount
          tmp_tx.Issuer = DefaultCoinIssuer
          tmp_tx.Currency = DefaultCoinCode
        }
        if (tx.tx_json.Memos !== undefined && tx.tx_json.Memos.length > 0 && tx.tx_json.Memos[0].Memo.MemoData !== undefined) {
          tmp_tx.Memo = convertHexToString(tx.tx_json.Memos[0].Memo.MemoData)
        }
      }
      let result = yield call(() => safeAddItem(db, 'Txs', 'Hash', tmp_tx))
      if (result) {
        insert_count += 1
      }
    }
    if (insert_count > 0) {
      yield call(handelLoadHistroyTxs)
    }
  }
}

export function* handelLoadIssuerCurrencyList({ payload }) {
  const { issuer } = payload
  let result = yield call(fetchIssuerCurrencyList, { issuer: issuer })
  yield put(loadIssuerCurrencyListSuccess(result))
}

export function* handelLoadSendCurrencyList({ payload }) {
  const { dest_account } = payload
  let result = yield call(fetchAccountLines, { address: dest_account })
  yield put(loadSendCurrencyListSuccess(result))
}

export function* handelLoadConvertPath({ payload }) {
  const address = yield select(state => state.User.address)
  if (address) {
    if (db === null) {
      yield call(initDB, address)
    }
    const { get, paths } = payload
    let result = yield call(fetchConvertPath, { address: address, destination_amount: get, paths: paths })
    console.log(result)
    yield put(loadConvertPathSuccess(result))
  }
}

function* handleSubmit({ payload }) {
  const seed = yield select(state => state.User.seed)
  const address = yield select(state => state.User.address)
  console.log(payload)
  let response = null
  switch (payload.action) {
    case TxType.Payment:
      if (payload.sub_aciton === 'normal') {
        let tmp_payload = {
          seed: seed,
          sour: address,
          dest: payload.dest_account,
          issuer: payload.issuer,
          currency: payload.currency,
          amount: payload.amount,
          sour_tag: payload.sour_tag,
          dest_tag: payload.dest_tag
        }
        if (payload.memo.trim() !== '') {
          tmp_payload.memos = formatMemo(payload.memo.trim())
        }
        response = yield call(submitPayment, tmp_payload)
        if (response.result === TxResult.Success) {
          yield call(fetchWalletInfo)
          yield call(fetchTrustLineList)
        }
        yield put(submitActionSuccess({ error: response.error, result: response.result }))
      } else if (payload.sub_aciton === 'path') {
        let tmp_payload = {
          seed: seed,
          address: address,
          destination_amount: payload.destination_amount,
          alt: payload.alt
        }
        response = yield call(submitPathPayment, tmp_payload)
        if (response.result === TxResult.Success) {
          yield call(fetchWalletInfo)
          yield call(fetchTrustLineList)
        }
        yield put(submitActionSuccess({ error: response.error, result: response.result }))
      }
      break
    case TxType.OfferCreate:
      response = yield call(submitOfferCreate, {
        seed: seed,
        address: address,
        TakerPays: payload.TakerPays,
        TakerGets: payload.TakerGets
      })
      if (response.result === TxResult.Success) {
        yield call(fetchOfferBook)
        yield call(fetchWalletInfo)
        yield call(fetchTrustLineList)
      }
      yield put(submitActionSuccess({ error: response.error, result: response.result }))
      break
    case TxType.OfferCancel:
      response = yield call(submitOfferCancel, {
        seed: seed,
        address: address,
        offer_sequence: payload.offer_sequence
      })
      if (response.result === TxResult.Success) {
        yield call(fetchOfferBook)
        yield call(fetchWalletInfo)
        yield call(fetchTrustLineList)
      }
      yield put(submitActionSuccess({ error: response.error, result: response.result }))
      break
    case TxType.TrustSet:
      response = yield call(submitTrustSet, {
        seed: seed,
        address: address,
        issuer: payload.issuer,
        currency: payload.currency,
        amount: payload.amount
      })
      if (response.result === TxResult.Success) {
        yield call(fetchTrustLineList)
      }
      yield put(submitActionSuccess({ error: response.error, result: response.result }))
      break
    case TxType.AccountDelete:
      response = yield call(submitAccountDelete, {
        seed: seed,
        address: address,
        dest: payload.dest
      })
      if (response.result === TxResult.Success) {
        yield call(fetchWalletInfo)
      }
      yield put(submitActionSuccess({ error: response.error, result: response.result }))
      break
    default:
      break
  }
}

export function* watchUser() {
  yield takeLatest(loginStart.type, handleLogin)
  yield takeLatest(logout.type, handleLogout)
  yield takeLatest(loadHistroyTxsStart.type, handelLoadHistroyTxs)
  yield takeLatest(loadIssuerCurrencyListStart.type, handelLoadIssuerCurrencyList)
  yield takeLatest(loadSendCurrencyListStart.type, handelLoadSendCurrencyList)
  yield takeLatest(loadConvertPathStart.type, handelLoadConvertPath)
  yield takeLatest(submitActionStart.type, handleSubmit)
  yield takeLatest('FetchWalletInfo', fetchWalletInfo)
  yield takeLatest('FetchTrustLineList', fetchTrustLineList)
  yield takeLatest('FetchOfferList', fetchOfferList)
}

