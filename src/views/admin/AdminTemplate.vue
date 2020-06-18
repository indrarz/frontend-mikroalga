<template>
    <div class="wrapper">
  <!-- Navbar -->
  <nav class="main-header navbar navbar-expand navbar-green navbar-dark">
    <!-- Left navbar links -->
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" data-widget="pushmenu" href="#"><i class="fas fa-bars"></i></a>
      </li>
    </ul>


    <!-- Right navbar links -->
    <ul class="navbar-nav ml-auto">
      <!-- Messages Dropdown Menu -->
      <li class="nav-item dropdown">
        <a class="nav-link" data-toggle="dropdown" href="#">
          <span v-for="data in datas" :key="data.id">{{data.nama}}</span>
        </a>
        <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
          <a style="cursor: pointer;" @click="logout" class="dropdown-item">
            <i class="fas fa-sign-out-alt"></i>
            <span>Logout</span>
          </a>
        </div>
      </li>
<!-- Tasks: style can be found in dropdown.less -->
<!-- User Account: style can be found in dropdown.less -->
    </ul>
  </nav>
  <!-- /.navbar -->

  <!-- Main Sidebar Container -->
  <aside class="main-sidebar sidebar-dark-success elevation-4">
    <!-- Brand Logo -->
    <a href="home.html" class="brand-link navbar-success">
      <span class="brand-text font-weight-light">Smart Algae Pond</span>
    </a>

    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Sidebar user panel (optional) -->
      <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="info">
          <a href="#" class="d-block">ADMIN</a>
        </div>
      </div>

      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          <!-- Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library -->
         <li class="nav-item">
                <router-link to="/admin" class="nav-link">
                 <i class="nav-icon fas fa-tachometer-alt"></i>
                  <p>Dashboard</p>
                </router-link>
              </li>
        <li class="nav-item">
                <router-link to="/admin/usermanagement" class="nav-link">
                  <i class="nav-icon fas fa-clipboard"></i>
                  <p>User Management</p>
                </router-link>
              </li>
        <li class="nav-item">
                <router-link to="/admin/mikroalga" class="nav-link">
                 <i class="nav-icon fab fa-envira"></i>
                  <p>Data Mikroalga</p>
                </router-link>
              </li>
        <li class="nav-item">
                <router-link to="/admin/kolam" class="nav-link">
                 <i class="nav-icon fas fa-tint"></i>
                  <p>Data Kolam</p>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/admin/akun" class="nav-link">
                  <i class="nav-icon fas fa-cog"></i>
                  <p>Pengaturan Akun</p>
                </router-link>
              </li>
        </ul>
      </nav>
      <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
  </aside>
<router-view></router-view>
  <!-- /.content-wrapper -->
  <footer class="main-footer">
    <strong>Copyright &copy;2020 Ilmu Komputer IPB.</strong>
    All rights reserved.
    <div class="float-right d-none d-sm-inline-block">
    </div>
  </footer>

  <!-- Control Sidebar -->
  <aside class="control-sidebar control-sidebar-dark">
    <!-- Control sidebar content goes here -->
  </aside>
  <!-- /.control-sidebar -->
</div>
</template>

<script>
import {getHeader, apiDomain, userUrl} from '../../config'
import axios from 'axios'
export default {
      data: function () {
        return {
          datas: []
        }
    },
  methods:{
    logout: function(){
      const logoutUrl = apiDomain+'api/auth/logout';
      axios.get(logoutUrl,{headers: getHeader()})
      .then(response =>{
        window.localStorage.removeItem('authUser');
        window.localStorage.removeItem('role');
        console.log(response);
        this.$router.push('/')
      })
    },
    getMe: function(){
      var app = this;

         axios.get(userUrl, {headers: getHeader()})
            .then(function (response) {
            app.datas = response;
            //console.log(app.datas);
        })
        .catch(function (error) {
            console.log(error.message);
        });
    }
  },
  created(){
    this.getMe();
  }
}
</script>