const XRP2DropRate = 1000 * 1000
const RippleEpoch = 946684800
const DefaultCoinIssuer = 'Ripple'
const DefaultCoinCode = 'XRP'
const MainNetURL = 'wss://xrplcluster.com'
const MainNetS1URL = 'wss://s1.ripple.com'
const MainNetS2URL = 'wss://s2.ripple.com'
const TestNetURL = 'wss://s.altnet.rippletest.net:51233'
const ServerOptions = [
  { value: MainNetURL, label: `Main Net: ${MainNetURL}` },
  { value: MainNetS1URL, label: `Main Net: ${MainNetS1URL}` },
  { value: MainNetS2URL, label: `Main Net: ${MainNetS2URL}` }
]

const TxType = {
  Payment: 'Payment',
  OfferCreate: 'OfferCreate',
  OfferCancel: 'OfferCancel',
  TrustSet: 'TrustSet',
  AccountDelete: 'AccountDelete'
}

const TxResult = {
  Success: 'tesSUCCESS'
}

const WalletPageTab = {
  Account: 'Account',
  Send: 'Send',
  Convert: 'Convert',
  Trade: 'Trade',
  Assets: 'Assets',
  Histroy: 'Histroy',
  Delete: '!!!Delete',
  Redeem: '!!!Redeem'
}

const OpenPageTab = {
  GenNew: 'Generate',
  Temp: 'Temp',
  Saved: 'Saved',
  Add: 'Add',
}

const PaySubAction = {
  Normal: 'Normal',
  Path: 'Path'
}

const CodeBackground = {
  0: '',
  1: '',
  2: 'bg-yellow-300',
  3: 'bg-yellow-300',
  4: 'bg-yellow-300',
  5: 'bg-indigo-300'
}

export {
  DefaultCoinIssuer,
  DefaultCoinCode,
  XRP2DropRate,
  RippleEpoch,
  MainNetURL,
  TestNetURL,
  ServerOptions,
  TxType,
  TxResult,
  WalletPageTab,
  OpenPageTab,
  PaySubAction,
  CodeBackground
}