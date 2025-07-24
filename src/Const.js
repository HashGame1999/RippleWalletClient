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
  { value: MainNetS2URL, label: `Main Net: ${MainNetS2URL}` },
  { value: TestNetURL, label: `Test Net: ${TestNetURL}` }
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

const ConsolePageTab = {
  Play: 'Play',
  Invite: 'Invite',
  Config: 'Config',
}

const TableSetting = {
  GameTxs: {
    Name: 'GAME_TXS',
    Key: 'tx_hash'
  },
  OperatorTxs: {
    Name: 'OPERATOR_TXS',
    Key: 'tx_hash'
  },
  Draws: {
    Name: 'DRAWS',
    Key: 'draw_id'
  },
  Breakdowns: {
    Name: 'BREAKDOWNS',
    Key: 'ticket_tx_hash'
  }
}

const CodeBackground = {
  0: '',
  1: '',
  2: 'bg-yellow-300',
  3: 'bg-yellow-300',
  4: 'bg-yellow-300',
  5: 'bg-indigo-300'
}

const divContainerColor = `bg-yellow-100 dark:bg-yellow-200 hover:bg-yellow-200 dark:hover:bg-yellow-100`
const divContainerColor2 = `bg-yellow-200 dark:bg-gray-200 hover:bg-yellow-100 dark:hover:bg-gray-100`
const divContainerMain = `h-96 w-full border-2 border-indigo-500 rounded-lg`
const divContainerBg = `bg-yellow-200 dark:bg-gray-200`
const divContainerHover = `hover:bg-yellow-100 dark:hover:bg-gray-100`
const divContainerSize = `md:h-64 md:w-64 lg:h-96 lg:w-96`

const labelStyle = `text-2xl font-bold text-gray-500 dark:text-gray-200`
const inputColor = `bg-gray-200 text-gray-500 dark:text-gray-200 dark:bg-gray-700`

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
  ConsolePageTab,
  TableSetting,
  CodeBackground,
  divContainerColor,
  divContainerColor2,
  divContainerMain,
  divContainerBg,
  divContainerHover,
  divContainerSize,
  labelStyle,
  inputColor
}