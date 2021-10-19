<template>
  <div>
    <b-form-select
      v-model="selected"
      :options="symbols"
      @change="updateData(5, '5D', selected)"
    ></b-form-select>
    <CChartLine :datasets="datasets" :labels="labels" :options="options" />
    <div class="btn-group" role="group">
      <button
        type="button"
        :class="getActiveClass('1D')"
        @click="updateData(1, '1D', selected)"
      >
        1D
      </button>
      <button
        type="button"
        :class="getActiveClass('5D')"
        @click="updateData(5, '5D', selected)"
      >
        5D
      </button>
      <button
        type="button"
        :class="getActiveClass('1M')"
        @click="updateData(30, '1M', selected)"
      >
        1M
      </button>
      <button
        type="button"
        :class="getActiveClass('3M')"
        @click="updateData(90, '3M', selected)"
      >
        3M
      </button>
      <button
        type="button"
        :class="getActiveClass('6M')"
        @click="updateData(180, '6M', selected)"
      >
        6M
      </button>
      <button
        type="button"
        :class="getActiveClass('1Y')"
        @click="updateData(365, '1Y', selected)"
      >
        1Y
      </button>
      <button
        type="button"
        :class="getActiveClass('5Y')"
        @click="updateData(1460, '5Y', selected)"
      >
        5Y
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
      btnActiveID: '5D',
      days: 20,
      datasets: [
        {
          label: 'AAPL',
          lineTension: 0.01,
          backgroundColor: 'rgba(75,192,192,0.4)',
          data: [65.6, 59.6, 80.3, 81.1, 56.9, 55.8, 40.2],
        },
      ],
      labels: [
        '2021-10-15',
        '2021-10-16',
        '2021-10-17',
        '2021-10-18',
        '2021-10-19',
      ],
      options: {
        elements: {
          point: {
            radius: 0.1,
          },
        },
        scales: {
          yAxes: [
            {
              position: 'right',
            },
          ],
          xAxes: [
            {
              type: 'time',
              time: {
                unit: 'day',
                displayFormats: {
                  day: 'DD MMM YY',
                },
              },
              ticks: {
                autoSkip: true,
                maxTicksLimit: 5,
              },
            },
          ],
        },
      },
    }
  },
  async mounted() {
    await this.getData(5, this.datasets[0].label)
  },
  methods: {
    /**
     * Update data and active btn class and selected company symbol
     */
    async updateData(days, ID, symbol) {
      this.btnActiveID = ID
      await this.getData(days, symbol)
      this.setOptions(days)
      this.setLabel(symbol)
    },
    /**
     * Get active class for btn
     */
    getActiveClass(ID) {
      if (ID === this.btnActiveID) {
        return 'btn btn-secondary active'
      } else {
        return 'btn btn-secondary'
      }
    },
    /**
     * Update data
     */
    async getData(days, symbol) {
      await this.$axios
        .$get(
          `historical-price-full/${symbol}?serietype=line&timeseries=${days}&apikey=28538229427f33fe650c547a9a1e99e7`
        )
        .then((res) => {
          const newData = []
          const newLabels = []

          res.historical.forEach((result) => {
            newData.push(result.close)
            newLabels.push(result.date)
          })

          this.datasets[0].data = newData
          this.labels = newLabels
        })
    },
    /**
     * Set datasets label
     */
    setLabel(label) {
      this.datasets[0].label = label
    },
    /**
     * Set chart options
     */
    setOptions(days) {
      switch (days) {
        case 1:
          this.options = {
            ...this.options,
          }
          break
        case 5:
          this.options = {
            ...this.options,
          }
          break
        case 30:
          this.options = {
            ...this.options,
          }
          break
        case 90:
          this.options = {
            ...this.options,
          }
          break
        case 180:
          this.options = {
            ...this.options,
          }
          break
        case 365:
          this.options = {
            ...this.options,
          }
          break
        case 1460:
          this.options = {
            ...this.options,
          }
          break
        default:
          this.options = {
            ...this.options,
          }
      }
    },
  },
}
</script>
