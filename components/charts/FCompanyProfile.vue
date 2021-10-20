<template>
  <div>
    <b-form-select
      v-model="selected"
      :options="symbols"
      @change="getData(selected)"
    ></b-form-select>
    <div class="FCo-table">
      <b-table striped :items="items" thead-class="hidden-header"></b-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      APIKey: process.env.API_KEY,
      items: [['Loading...', 'Loading...']],
      selected: 'AAPL',
      symbols: [
        'AAPL',
        'ADBE',
        'ADI',
        'ADP',
        'ADSK',
        'AEP',
        'ALGN',
        'ALXN',
        'AMAT',
        'AMD',
        'AMGN',
        'AMZN',
        'ANSS',
        'ASML',
        'ATVI',
        'AVGO',
        'AXP',
        'BA',
        'BIDU',
        'BIIB',
        'BKNG',
        'CAT',
        'CDNS',
        'CDW',
        'CERN',
        'CHKP',
        'CHTR',
        'CMCSA',
        'COST',
        'CPRT',
        'CRM',
        'CSCO',
        'CSX',
        'CTAS',
        'CTSH',
        'CVX',
        'DIS',
        'DLTR',
        'DOCU',
        'DOW',
        'DXCM',
        'EA',
        'EBAY',
        'EXC',
        'FAST',
        'FB',
        'FISV',
        'FOX',
        'FOXA',
        'GILD',
        'GOOG',
        'GOOGL',
        'GS',
        'HD',
        'HON',
        'IBM',
        'IDXX',
        'ILMN',
        'INCY',
        'INTC',
        'INTU',
        'ISRG',
        'JD',
        'JNJ',
        'JPM',
        'KHC',
        'KLAC',
        'KO',
        'LRCX',
        'LULU',
        'MAR',
        'MCD',
        'MCHP',
        'MDLZ',
        'MELI',
        'MMM',
        'MNST',
        'MRK',
        'MRNA',
        'MRVL',
        'MSFT',
        'MTCH',
        'MU',
        'MXIM',
        'NFLX',
        'NKE',
        'NTES',
        'NVDA',
        'NXPI',
        'OKTA',
        'ORLY',
        'PAYX',
        'PCAR',
        'PDD',
        'PEP',
        'PG',
        'PTON',
        'PYPL',
        'QCOM',
        'REGN',
        'ROST',
        'SBUX',
        'SGEN',
        'SIRI',
        'SNPS',
        'SPLK',
        'SWKS',
        'TCOM',
        'TEAM',
        'TMUS',
        'TRV',
        'TSLA',
        'TXN',
        'UNH',
        'V',
        'VRSK',
        'VRSN',
        'VRTX',
        'VZ',
        'WBA',
        'WDAY',
        'WDC',
        'WMT',
        'XEL',
        'XLNX',
        'ZM',
      ],
    }
  },
  async mounted() {
    await this.getData('AAPL')
  },
  methods: {
    async getData(symbol) {
      let items = []
      await this.$axios
        .$get(`v3/quote/${symbol}?apikey=${this.APIKey}`)
        .then((res) => {
          items = [
            ['Last', res[0].price],
            ['Volume', res[0].volume],
            ['Open', res[0].open],
            ['Close', res[0].previousClose],
            ['High', res[0].dayHigh],
            ['Low', res[0].dayLow],
            ['Beta', ''],
            // ['Beta', res[0].beta],
            ['Year High', res[0].yearHigh],
            ['Year Low', res[0].yearLow],
            ['Dividend', ''],
            ['Div. Pay Date', ''],
            ['Ex-Div date', ''],
            // ['Dividend', res[0].dividend],
            // ['Div. Pay Date', res[0].paymentDate],
            // ['Ex-Div date', res[0].date],
            ['Market Cap', res[0].marketCap],
            ['Shares Out', res[0].sharesOutstanding],
            ['PB Ratio', ''],
            // ['PB Ratio', res[0].pbRatio],
            ['PE', res[0].pe],
            ['EPS', res[0].eps],
            ['Exchange', ''],
            // ['Exchange', res[0].exchangeShortName],
          ]
        })
      await this.$axios
        .$get(`v3/profile/${symbol}?apikey=${this.APIKey}`)
        .then((res) => {
          items[6] = ['Beta', res[0].beta]
          items[17] = ['Exchange', res[0].exchangeShortName]
        })
      await this.$axios
        .$get(`v3/key-metrics/${symbol}?apikey=${this.APIKey}`)
        .then((res) => {
          items[14] = ['PB Ratio', res[0].pbRatio]
        })
      await this.$axios
        .$get(`v4/company-outlook?symbol=${symbol}&apikey=${this.APIKey}`)
        .then((res) => {
          if (res.stockDividend !== null) {
            items[9] = ['Dividend', res.stockDividend[0].dividend]
            items[10] = ['Div. Pay Date', res.stockDividend[0].paymentDate]
            items[11] = ['Ex-Div date', res.stockDividend[0].date]
          }
        })
      this.items = items
    },
  },
}
</script>
