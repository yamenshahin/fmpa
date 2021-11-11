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
      APIKey: process.env.API_KEY,
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
      datasets: [
        {
          label: 'AAPL',
          lineTension: 0.01,
          backgroundColor: 'rgba(52, 168, 83,0.4)',
          borderColor: 'rgba(52, 168, 83,0.9)',
          borderWidth: 2,
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
        legend: {
          display: false,
        },
        tooltips: {
          displayColors: false,

          callbacks: {
            label(tooltipItem) {
              const label = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(tooltipItem.yLabel)
              return label
            },
          },
        },
        elements: {
          point: {
            radius: 0.1,
            hitRadius: 3,
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
              distribution: 'series',
              time: {
                unit: 'day',
                displayFormats: {
                  day: 'DD MMM',
                },
              },
              ticks: {
                autoSkip: true,
                maxTicksLimit: 4,
                maxRotation: 0,
                minRotation: 0,
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
      this.setActiveClass(ID)
      await this.getData(days, symbol)
      this.setOptions(days)
      this.setLabel(symbol)
    },
    setActiveClass(ID) {
      this.btnActiveID = ID
    },
    /**
     * Set active class
     */
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
      const apiURL = this.getURL(days, symbol)
      await this.$axios.$get(apiURL).then((res) => {
        this.setData(days, res)
      })
    },
    /**
     * Set datasets label
     */
    setLabel(label) {
      this.datasets[0].label = label
    },
    /**
     * Get the API URL
     */
    getURL(days, symbol) {
      let url = ''
      switch (days) {
        case 1:
          url = `v3/historical-chart/1min/${symbol}?timeseries=${days}&apikey=${this.APIKey}`
          break
        case 5:
          url = `v3/historical-chart/15min/${symbol}?timeseries=${days}&apikey=${this.APIKey}`
          break
        default:
          url = `v3/historical-price-full/${symbol}?serietype=line&timeseries=${days}&apikey=${this.APIKey}`
      }
      return url
    },
    /**
     * Set chart data
     */
    setData(days, res) {
      const newData = []
      const newLabels = []
      switch (days) {
        case 1:
          res.forEach((result) => {
            // Only 1 day
            const firstDateSTR = res[0].date
            const firstDate = firstDateSTR.split(' ')[0]
            const currentDateSTR = result.date
            const currentDate = currentDateSTR.split(' ')[0]
            // Only 1 day
            if (currentDate !== firstDate) return
            newData.push(result.close)
            newLabels.push(result.date)
          })
          break
        case 5:
          res.forEach((result) => {
            // Only 5 days
            const firstDateSTR = res[0].date
            const firstDate = new Date(firstDateSTR)
            const currentDateSTR = result.date
            const currentDate = new Date(currentDateSTR)
            const dateDiff = Math.abs(firstDate - currentDate)
            // Only 5 days
            if (dateDiff > 596200005) return
            newData.push(result.close)
            newLabels.push(result.date)
          })
          break
        default:
          res.historical.forEach((result) => {
            newData.push(result.close)
            newLabels.push(result.date)
          })
      }
      this.datasets[0].data = newData
      this.labels = newLabels
    },
    /**
     * Set chart options
     */
    setOptions(days) {
      console.log('Set options')
      switch (days) {
        case 1:
          console.log('Set options 1')
          this.options = {
            legend: {
              display: false,
            },
            tooltips: {
              displayColors: false,

              callbacks: {
                label(tooltipItem) {
                  const label = new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  }).format(tooltipItem.yLabel)
                  return label
                },
              },
            },
            elements: {
              point: {
                radius: 0.1,
                hitRadius: 3,
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
                  distribution: 'series',
                  time: {
                    unit: 'hour',
                    displayFormats: {
                      minute: 'h:mm a',
                    },
                  },
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 5,
                    maxRotation: 0,
                    minRotation: 0,
                  },
                },
              ],
            },
          }

          break
        case 5:
          console.log('Set options 5')
          this.options = {
            legend: {
              display: false,
            },
            tooltips: {
              displayColors: false,

              callbacks: {
                label(tooltipItem) {
                  const label = new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  }).format(tooltipItem.yLabel)
                  return label
                },
              },
            },
            elements: {
              point: {
                radius: 0.1,
                hitRadius: 3,
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
                  distribution: 'series',
                  time: {
                    unit: 'day',
                    displayFormats: {
                      day: 'DD MMM',
                    },
                  },
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 4,
                    maxRotation: 0,
                    minRotation: 0,
                  },
                },
              ],
            },
          }

          break
        default:
          console.log('Set options all')
          this.options = {
            legend: {
              display: false,
            },
            tooltips: {
              displayColors: false,

              callbacks: {
                label(tooltipItem) {
                  const label = new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  }).format(tooltipItem.yLabel)
                  return label
                },
              },
            },
            elements: {
              point: {
                radius: 0.1,
                hitRadius: 3,
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
                  distribution: 'series',
                  time: {
                    unit: 'day',
                    displayFormats: {
                      day: 'DD MMM YY',
                    },
                  },
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 5,
                    maxRotation: 0,
                    minRotation: 0,
                  },
                },
              ],
            },
          }
      }
    },
  },
}
</script>
