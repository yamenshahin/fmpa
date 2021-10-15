<template>
  <div>
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(submitForm)">
        <CRow>
          <CCol lg="5">
            <ValidationProvider
              v-slot="validationContext"
              :name="$t('From date')"
              rules="required"
            >
              <label>{{ $t('From date') }}</label>
              <b-form-datepicker
                v-model="fromDate"
                :state="getValidationState(validationContext)"
                :placeholder="$t('No date selected')"
              ></b-form-datepicker>

              <b-form-invalid-feedback>{{
                validationContext.errors[0]
              }}</b-form-invalid-feedback>
            </ValidationProvider>
          </CCol>

          <CCol lg="5">
            <ValidationProvider
              v-slot="validationContext"
              :name="$t('To date')"
              rules="required"
            >
              <label>{{ $t('To date') }}</label>
              <b-form-datepicker
                v-model="toDate"
                :state="getValidationState(validationContext)"
                :placeholder="$t('No date selected')"
              ></b-form-datepicker>

              <b-form-invalid-feedback>{{
                validationContext.errors[0]
              }}</b-form-invalid-feedback>
            </ValidationProvider>
          </CCol>
          <CCol lg="2">
            <label>{{ $t('Compare') }}?</label>
            <CSwitch
              class="mx-1 mt-2"
              color="primary"
              :checked.sync="isCompare"
              variant="opposite"
              shape="pill"
              v-bind="compareLabels"
            />
          </CCol>
          <CCol lg="5">
            <div v-if="isCompare">
              <ValidationProvider
                v-slot="validationContext"
                :name="$t('From date 2')"
                rules="required"
              >
                <label>{{ $t('From date 2') }}</label>
                <b-form-datepicker
                  v-model="fromDate2"
                  :state="getValidationState(validationContext)"
                  :placeholder="$t('No date selected')"
                ></b-form-datepicker>

                <b-form-invalid-feedback>{{
                  validationContext.errors[0]
                }}</b-form-invalid-feedback>
              </ValidationProvider>
            </div>
          </CCol>
          <CCol lg="5">
            <div v-if="isCompare">
              <ValidationProvider
                v-slot="validationContext"
                :name="$t('To date 2')"
                rules="required"
              >
                <label>{{ $t('To date 2') }}</label>
                <b-form-datepicker
                  v-model="toDate2"
                  :state="getValidationState(validationContext)"
                  :placeholder="$t('No date selected')"
                ></b-form-datepicker>

                <b-form-invalid-feedback>{{
                  validationContext.errors[0]
                }}</b-form-invalid-feedback>
              </ValidationProvider>
            </div>
          </CCol>
          <CCol lg="2">
            <CButton type="submit" size="sm" color="primary" class="mt-33">
              {{ $t('Submit') }}
            </CButton>
          </CCol>
        </CRow>
      </form>
    </ValidationObserver>
    <CChartBar :datasets="datasets" :labels="labels" :options="options" />
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'invoices',
    },
    mainLabel: {
      type: String,
      default: 'total',
    },
  },
  data() {
    return {
      fromDate: '',
      toDate: '',
      fromDate2: '',
      toDate2: '',
      isCompare: false,
      compareLabels: {
        labelOn: 'yes',
        labelOff: 'no',
      },
      datasets: [
        {
          label: 'Total',
          backgroundColor: '#058dc7',
          data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11],
        },
      ],
      labels: ['Under Process', 'Under Confirmation', 'Paid'],
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    }
  },
  async mounted() {
    await this.getData(0)
  },
  methods: {
    async getData(index, setSecondDatasetsLabel = false) {
      let dates
      if (index === 0) {
        dates = {
          fromDate: this.fromDate,
          toDate: this.toDate,
        }
      } else if (index === 1) {
        dates = {
          fromDate: this.fromDate2,
          toDate: this.toDate2,
        }
      }

      await this.$axios
        .$post(
          `statistics/${this.type}-${this.mainLabel.toLowerCase()}-status/`,
          dates
        )
        .then((res) => {
          // Add or remove the second dataset in datasets
          if (setSecondDatasetsLabel && this.datasets.length === 1) {
            this.datasets.push({
              label: 'Total',
              backgroundColor: '#ed7e17',
              data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11],
            })
            this.datasets[1].backgroundColor = '#ed7e17'
          } else if (!setSecondDatasetsLabel && this.datasets.length > 1) {
            this.datasets.pop()
          }
          // set data
          if (this.mainLabel === 'Total') {
            this.setDatasetsData(index, res.totals)
          } else if (this.mainLabel === 'Count') {
            this.setDatasetsData(index, res.counts)
          }

          this.setLabels(res.labels)
          this.setDatasetsLabel(index, setSecondDatasetsLabel)
        })
    },
    setDatasetsData(index = 0, data) {
      this.datasets[index].data = data
    },
    setLabels(labels) {
      this.labels = labels
    },
    setDatasetsLabel(index, setSecondDatasetsLabel) {
      if (setSecondDatasetsLabel) {
        const labelNumber = index + 1
        this.datasets[index].label = `${this.mainLabel} ${labelNumber}`
      } else {
        this.datasets[index].label = this.mainLabel
      }
    },
    async submitForm() {
      if (this.isCompare) {
        await this.getData(0, true)
        await this.getData(1, true)
      } else {
        await this.getData(0)
      }
    },
  },
}
</script>
