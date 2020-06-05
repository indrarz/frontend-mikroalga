<template>
  <div class="hold-transition login-page">
<div class="login-box">
  <div class="login-logo">
    <a href="#"><b>Smart Algae Pond</b></a>
  </div>
  <!-- /.login-logo -->
  <div class="card">
    <div class="card-body login-card-body">
      <p class="login-box-msg">Login</p>

      <form autocomplete="off" v-on:submit.prevent="loginuser" method="POST">
        <div class="input-group mb-3">
          <input type="email" class="form-control" placeholder="Email" id="email" v-model="login.email" required>
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-envelope"></span>
            </div>
          </div>
        </div>
        <div class="input-group mb-3">
          <input type="password" class="form-control" placeholder="Password" id="password" v-model="login.password" required>
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-lock"></span>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-8">
            <div class="icheck-primary">
              <input type="checkbox" id="remember">
              <label for="remember">
                Remember Me
              </label>
            </div>
          </div>
          <!-- /.col -->
          <div class="col-4">
            <button type="submit" class="btn btn-primary btn-block">Sign In</button>
          </div>
          <!-- /.col -->
        </div>
      </form>


      <p class="mb-1">
        <a href="forgot-password.html">Lupa Password</a>
      </p>
      <p class="mb-0">
        <a href="register.html" class="text-center">Daftar</a>
      </p>
    </div>
    <!-- /.login-card-body -->
  </div>
</div>
</div>
<!-- /.login-box -->
</template>

<script>
import {loginUrl, getHeader, userUrl} from '../config'
import axios from 'axios'
export default{
  data(){
    return{
      login:{
        email: '',
        password: ''
      }
    }
  },
  methods: {
    /*login: function () {
        let email = this.email 
        let password = this.password
        this.$store.dispatch('login', { email, password })
       .then(() => this.$router.push('/'))
       .catch(err => console.log(err))
      }*/
    loginuser(){
      const postData = {
        email: this.login.email,
        password: this.login.password,
      }
      const authUser = {}
      axios.post(loginUrl,postData)
        .then(response => {
          if (response.status === 200){
            //console.log('Oauth token', response)
            authUser.access_token = response.data.access_token
            window.localStorage.setItem('authUser', JSON.stringify(authUser))
            axios.get(userUrl, {headers: getHeader()})
              .then(response =>{
                //console.log('user object', response)
                authUser.id_role = response.data.id_role
                window.localStorage.setItem('role', JSON.stringify(authUser.id_role))
                //this.$router.push('/admin')
                if(authUser.id_role === 1){
                  this.$router.push('/admin')
                }
                else if(authUser.id_role === 2){
                  this.$router.push('/peneliti')
                }
                else if(authUser.id_role === 3){
                  this.$router.push('/operator')
                }
              })
          }
        })
    }
  }
}
</script>

<style>
  /*@import "./assets/plugins/fontawesome-free/css/all.min.css";
  @import "https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css";
  @import "./assets/plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css";
  @import "./assets/plugins/icheck-bootstrap/icheck-bootstrap.min.css";
  @import "./assets/plugins/jqvmap/jqvmap.min.css";
  @import "./assets/dist/css/adminlte.min.css";
  @import "./assets/plugins/overlayScrollbars/css/OverlayScrollbars.min.css";
  @import "./assets/plugins/daterangepicker/daterangepicker.css";
  
  @import "./assets/./assets/plugins/summernote/summernote-bs4.css";
  @import "https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700";
  @import "./assets/plugins/bootstrap/js/bootstrap.bundle.min.js";
  @import "./assets/plugins/chart.js/Chart.min.js";
  @import "./assets/plugins/sparklines/sparkline.js";
  @import "./assets/plugins/jqvmap/jquery.vmap.min.js";
  @import "./assets/plugins/jqvmap/maps/jquery.vmap.usa.js";
  @import "./assets/plugins/jquery-knob/jquery.knob.min.js";
  @import "./assets/plugins/moment/moment.min.js";
  @import "./assets/plugins/daterangepicker/daterangepicker.js";
  @import "./assets/plugins/tempusdominus-bootstrap-4/js/tempusdominus-bootstrap-4.min.js";
  @import "./assets/plugins/summernote/summernote-bs4.min.js";
  @import "./assets/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js";
  @import "./assets/dist/js/adminlte.js";
  @import "./assets/dist/js/pages/dashboard.js";
  @import "./assets/dist/js/demo.js";*/
</style>