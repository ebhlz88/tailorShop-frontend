<template>
  <div id="table">
    <!-- <div class="limiter">
      <div class="container-table100"> -->
    <div class="wrap-table100">
      <div class="table100">
        <table>
          <thead>
            <tr class="table100-head">
              <th class="column1">ID</th>
              <th class="column2">NAME</th>
              <th class="column3">PHONE</th>
              <th class="column3">ORDER'S LIST</th>
              <th class="column3">PLACE ORDER</th>
            </tr>
          </thead>
          <tbody v-for="items in list" :key="items.id">

            <tr>
              <td class="column1">{{ items.id }}</td>
              <td class="column2">{{ items.name }}</td>
              <td class="column3">{{ items.fm_number }}</td>
              <td class="column3">
                <button v-on:click="showorderclick(items.id)">
                  Order's List
                </button>
              </td>
              <td class="column3">
                <button v-on:click="placeorders(items.id)">Place Order</button>
              </td>
            </tr>
    
            
            <tr :id="items.id" class="disp">
                <!-- :id="items.id" class="disp" :class="{active:items.id}" -->
              <td class="column1">
                <input
                  type="text"
                  class="form-control"
                  v-model="orderdata.numberofsuits"
                  placeholder="Number of Suits"
                />
              </td>
              <td class="column3">
                <button
                  v-on:click="submitorder(items.id)"
                  class="btn btn-primary"
                >
                  Submit
                </button>
              </td>
            </tr>
            
            <!-- 

                <tr>
                    <td>
                <table v-if="showorders">
              <thead>
                <tr class="table100-head">
                  <th class="column1">ID</th>
                  <th class="column2">Number of suits</th>
                  <th class="column3">dateordered</th>
                  <th class="column3">deliver</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="column1">ID</td>
                  <td class="column2">NUMBER</td>
                  <td class="column3">DATE</td>
                  <td class="column3"><button>deliver</button></td>
                </tr>
              </tbody>
                </table>
                </td>
                </tr> -->
          </tbody>
        </table>
      </div>
    </div>
    <Modal v-model="showModal" title="Orders List">
      <table class="modaltable">
        <thead>
          <tr class="table100-head">
            <th class="column1">ID</th>
            <th class="column2">Number of suits</th>
            <th class="column3">Dateordered</th>
            <th class="column3">Is Delivered</th>
            <th class="column3">Deliver</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="items in orderlist" :key="items.id">
            <td class="column1">{{ items.customerFK.id }}</td>
            <td class="column2">{{ items.numberofsuits }}</td>
            <td class="column3">{{ items.date_ordered }}</td>
            <td class="column3">{{ items.delivered }}</td>
            <td class="column3">
              <button v-on:click="deliver(items.id)">deliver</button>
            </td>
          </tr>
        </tbody>
      </table>
    </Modal>
  </div>
  <!-- </div>
  </div> -->
</template>

<script>
import Vue from "vue";
import VueAxios from "vue-axios";
import axios from "axios";

import VueModal from "@kouts/vue-modal";
import "@kouts/vue-modal/dist/vue-modal.css";

Vue.use(VueAxios, axios);
export default {
  components: {
    Modal: VueModal,
  },
  data() {
    return {
      show: false,
      list: undefined,
      showModal: false,
      orderlist: null,
      deliverdata: {
        delivered: true,
      },
      orderdata: {
        customerFK: null,
        numberofsuits: null,
        ordercustomerid: null,
      },
    };
  },
  props: ["searchd"],
  methods: {
    deliver(event) {
      axios
        .post("http://127.0.0.1:8000/orderupdate/" + event, this.deliverdata)
        .then((resp) => {
          console.log(resp.data);
        });
      this.showorders();
    },
    searchfunction() {
      Vue.axios
        .get("http://127.0.0.1:8000/customersearch?search=" + this.searchd)
        .then((resp) => {
          this.list = resp.data;

          console.log(resp.data);
        });
    },
    submitorder(event) {
      this.orderdata.customerFK = event;
      axios
        .post("http://127.0.0.1:8000/orderpost", this.orderdata)
        .then((resp) => {
          this.orderlist = resp.data;

          console.log(resp.data);
        });
    },
    placeorders(event) {
        this.show = !this.show;
        var x = document.getElementById(event)
        if(this.show){
        x.style.display = "block";
        x.style.width = "20rem"
        
        }
        else {
        x.style.display = "none";
        x.style.width = "20rem"
        }
        // if(event==2) {
        //     }
    },
    showorderclick(event) {

      this.showModal = !this.showModal;
      this.ordercustomerid = event;
      this.showorders();
    },
    showorders() {
      Vue.axios
        .get("http://127.0.0.1:8000/orderget/" + this.ordercustomerid)
        .then((resp) => {
          this.orderlist = resp.data;

          console.log(resp.data);
        });
    },
  },
  mounted() {
    Vue.axios.get("http://127.0.0.1:8000/customerpost").then((resp) => {
      this.list = resp.data;

      console.log(resp.data);
    });
  },
};
</script>

<style>
/*//////////////////////////////////////////////////////////////////
[ FONT ]*/

/*//////////////////////////////////////////////////////////////////
[ RESTYLE TAG ]*/
* {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
}
.disp {
  display: none;
}

/* ------------------------------------ */
a {
  margin: 0px;
  transition: all 0.4s;
  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
}

a:focus {
  outline: none !important;
}

a:hover {
  text-decoration: none;
}

/* ------------------------------------ */
h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0px;
}

p {
  margin: 0px;
}

ul,
li {
  margin: 0px;
  list-style-type: none;
}

/* ------------------------------------ */
input {
  display: block;
  outline: none;
  border: none !important;
}

textarea {
  display: block;
  outline: none;
}
.modaltable {
  margin-bottom: 2rem;
}

textarea:focus,
input:focus {
  border-color: transparent !important;
}

/* ------------------------------------ */
button {
  outline: none !important;
  border: none;
  background: transparent;
}

button:hover {
  cursor: pointer;
  text-decoration: underline;
}

iframe {
  border: none !important;
}

/*//////////////////////////////////////////////////////////////////
[ Utiliti ]*/

/*//////////////////////////////////////////////////////////////////
[ Table ]*/

.limiter {
  width: 100%;
  margin: 0 auto;
}

.container-table100 {
  width: 100%;
  min-height: 100vh;
  background: #8bbabb;

  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  padding: 33px 30px;
}

.wrap-table100 {
  width: 100%;
  margin-left: 1.5rem;
}

table {
  border-spacing: 1;
  border-collapse: collapse;
  background: white;
  overflow: hidden;
  width: 100%;
  margin: 0 auto;
  position: relative;
}
table * {
  position: relative;
}
table td,
table th {
  padding-left: 8px;
}
table thead tr {
  height: 60px;
  background: #36304a;
}
table tbody tr {
  height: 50px;
}
table tbody tr:last-child {
  border: 0;
}
table td,
table th {
  text-align: left;
}
table td.l,
table th.l {
  text-align: right;
}
table td.c,
table th.c {
  text-align: center;
}
table td.r,
table th.r {
  text-align: center;
}

.table100-head th {
  font-family: OpenSans-Regular;
  font-size: 18px;
  color: #fff;
  line-height: 1.2;
  font-weight: unset;
}

tbody tr:nth-child(even) {
  background-color: #f5f5f5;
}

tbody tr {
  font-family: OpenSans-Regular;
  font-size: 15px;
  color: #808080;
  line-height: 1.2;
  font-weight: unset;
}

tbody tr:hover {
  color: #555555;
  background-color: #f5f5f5;
}

.column1 {
  width: 260px;
  padding-left: 40px;
}

.column2 {
  width: 160px;
}

.column3 {
  width: 245px;
}

.column4 {
  width: 110px;
  text-align: right;
}

.column5 {
  width: 170px;
  text-align: right;
}

.column6 {
  width: 222px;
  text-align: right;
  padding-right: 62px;
}

@media screen and (max-width: 992px) {
  table {
    display: block;
  }
  table > *,
  table tr,
  table td,
  table th {
    display: block;
  }
  table thead {
    display: none;
  }
  table tbody tr {
    height: auto;
    padding: 37px 0;
  }
  table tbody tr td {
    padding-left: 40% !important;
    margin-bottom: 24px;
  }
  table tbody tr td:last-child {
    margin-bottom: 0;
  }
  table tbody tr td:before {
    font-family: OpenSans-Regular;
    font-size: 14px;
    color: #999999;
    line-height: 1.2;
    font-weight: unset;
    position: absolute;
    width: 40%;
    left: 30px;
    top: 0;
  }
  table tbody tr td:nth-child(1):before {
    content: "ID";
  }
  table tbody tr td:nth-child(2):before {
    content: "Name";
  }
  table tbody tr td:nth-child(3):before {
    content: "Phone Number";
  }
  table tbody tr td:nth-child(4):before {
    content: "Order List";
  }
  table tbody tr td:nth-child(5):before {
    content: "Place order";
  }

  .column4,
  .column5,
  .column6 {
    text-align: left;
  }

  .column4,
  .column5,
  .column6,
  .column1,
  .column2,
  .column3 {
    width: 100%;
  }

  tbody tr {
    font-size: 14px;
  }
}

@media (max-width: 576px) {
  .container-table100 {
    padding-left: 15px;
    padding-right: 15px;
  }
}
</style>
