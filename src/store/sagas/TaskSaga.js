import { call, put, fork, select, cancelled, delay } from 'redux-saga/effects'
import { connectXRPL } from "./xrplSaga"

export function* taskInstant() {
  const interval = 3 * 1000
  try {
    while (true) {
      yield fork(connectXRPL)
      yield delay(interval)
    }
  } finally {
    if (yield cancelled()) {
      console.log('Scheduled taskInstant cancelled...')
    }
  }
}

export function* taskFast() {
  const interval = 10 * 1000
  try {
    while (true) {
      yield delay(interval)
    }
  } finally {
    if (yield cancelled()) {
      console.log('Scheduled taskFast cancelled...')
    }
  }
}

export function* taskSlow() {
  const interval = 30 * 1000
  try {
    while (true) {
      const address = yield select(state => state.User.address)
      if (address) {
      }
      yield delay(interval)
    }
  } finally {
    if (yield cancelled()) {
      console.log('Scheduled taskSlow cancelled...')
    }
  }
}