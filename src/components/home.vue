<template>
  <div>
    <div class="row p-4">
      <div class="col-md-3 form-group mb-5">
        <input
          type="text"
          class="form-control"
          v-model="searchdata"
          placeholder="Search Here"
        />
      </div>
      <div class="col-md-3 form-group">
        <input
          type="submit"
          class="btn btn-primary"
          v-on:click="searchfunction"
          value="Search"
          placeholder="Your phone"
        />
      </div>
    </div>
    <div class="content">
      <div>
        <div class="row align-items-stretch no-gutters contact-wrap">
          <div class="col-md-8">
            <div class="form h-100 " v-if="show">
              <h3>Add Customer</h3>
              <form
                class="mb-5"
                method="post"
                id="contactForm"
                name="contactForm"
              >
                <div class="row">
                  <div class="col-md-6 form-group mb-5">
                    <label for="" class="col-form-label">Name *</label>
                    <input
                      type="text"
                      class="form-control"
                      name="name"
                      id="name"
                      placeholder="Your name"
                    />
                  </div>
                  <div class="col-md-6 form-group mb-5">
                    <label for="" class="col-form-label">Phone Number *</label>
                    <input
                      type="text"
                      class="form-control"
                      name="email"
                      id="email"
                      placeholder="Your phone"
                    />
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-12 form-group">
                    <input
                      type="submit"
                      value="Add Customer"
                      class="btn btn-primary rounded-0 py-2 px-4"
                    />
                    <span class="submitting"></span>
                  </div>
                </div>
              </form>
            </div>
            <tablee v-if="!show" :searchd="searchdata" ref="form"></tablee>
          </div>
          <div class="col-md-4">
            <div class="contact-info h-100">
              <ul class="list-unstyled">
                <li class="d-flex">
                  <button v-on:click="customeradd" class="btn btn-primary">
                    Add Customer
                  </button>
                </li>
                <li class="d-flex">
                  <button
                    v-on:click="customerlist"
                    to="table"
                    class="btn btn-primary"
                  >
                    Customer List
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import tablee from "./table.vue";
export default {
  data() {
    return {
      show: false,
      searchdata: null,
      list: undefined,
    };
  },
  components: {
    tablee,
  },
  methods: {
    customeradd() {
      this.show = true;
    },
    customerlist() {
      this.show = false;
    },
    searchfunction() {
      this.$refs.form.searchfunction();
    },
  },
};
</script>

<style lang="scss">
body {
  font-family: "Roboto", sans-serif;
  background-color: #fff;
  line-height: 1.9;
  color: #8c8c8c;
  position: relative;
}
body:before {
  z-index: -1;
  position: absolute;
  height: 50vh;
  content: "";
  top: 0;
  left: 0;
  right: 0;
  background: #8bbabb;
}

h1,
h2,
h3,
h4,
h5,
h6,
.h1,
.h2,
.h3,
.h4,
.h5,
.h6 {
  font-family: "Roboto", sans-serif;
  color: #000;
}

a {
  -webkit-transition: 0.3s all ease;
  -o-transition: 0.3s all ease;
  transition: 0.3s all ease;
}
a,
a:hover {
  text-decoration: none !important;
}

.text-black {
  color: #000;
}

.content {
  padding: 1rem 0;
}

.heading {
  font-size: 2.5rem;
  font-weight: 900;
}

.content .form-control {
  border: none;
  border-bottom: 1px solid rgb(3, 3, 3);
  padding-left: 0;
  padding-right: 0;
  border-radius: 0;
  background: none;
}

.form-control:active,
.form-control:focus {
  outline: none;
  -webkit-box-shadow: none;
  box-shadow: none;
  border-color: #000;
}

.col-form-label {
  color: #000;
  font-size: 13px;
}

.btn,
.form-control,
.custom-select {
  height: 45px;
}

.custom-select:active,
.custom-select:focus {
  outline: none;
  -webkit-box-shadow: none;
  box-shadow: none;
  border-color: #000;
}
.list-unstyled .btn.btn-primary {
  background: #428296;
  color: #fff;
  padding: auto;
  width: 100%;
  border: none;
}
.list-unstyled .btn:hover {
  color: #fff;
  background-color: blue;
}
.btn {
  border: none;
  border-radius: 0;
  font-size: 12px;
  letter-spacing: 0.2rem;
  text-transform: uppercase;
}
.btn.btn-primary {
  background: #35477d;
  color: #fff;
  padding: 15px 20px;
}
.btn:hover {
  color: #fff;
}
.btn:active,
.btn:focus {
  outline: none;
  -webkit-box-shadow: none;
  box-shadow: none;
}

.contact-wrap {
  -webkit-box-shadow: 0 0px 20px 0 rgba(0, 0, 0, 0.2);
  box-shadow: 0 0px 20px 0 rgba(0, 0, 0, 0.2);
}
.contact-wrap .col-form-label {
  font-size: 14px;
  color: #b3b3b3;
  margin: 0 0 10px 0;
  display: inline-block;
  padding: 0;
}
.contact-wrap .form,
.contact-wrap .contact-info {
  padding: 40px;
  position: sticky;
  margin-right: 0px;
}

.contact-wrap .contact-info {
  color: rgba(255, 255, 255, 0.5);
}
.contact-wrap .contact-info ul li {
  margin-bottom: 15px;
  color: rgba(255, 255, 255, 0.5);
}
.contact-wrap .contact-info ul li .wrap-icon {
  font-size: 20px;
  color: #fff;
  margin-top: 5px;
}
.contact-wrap .form {
  background: #fff;
}
.contact-wrap .form h3 {
  color: #35477d;
  font-size: 20px;
  margin-bottom: 30px;
}
.contact-wrap .contact-info {
  background: #35477d;
}
.contact-wrap .contact-info h3 {
  color: #fff;
  font-size: 20px;
  margin-bottom: 30px;
}

label.error {
  font-size: 12px;
  color: red;
}

#message {
  resize: vertical;
}

#form-message-warning {
  color: #b90b0b;
}

#form-message-success {
  color: #55a44e;
  font-size: 18px;
  font-weight: bold;
}

.submitting {
  float: left;
  width: 100%;
  padding: 10px 0;
  display: none;
  font-weight: bold;
  font-size: 12px;
  color: #000;
}
</style>
