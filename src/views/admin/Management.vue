<template>
    <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <div class="content-header">
        <div class="container-fluid">
  
        </div><!-- /.container-fluid -->
      </div>
      <!-- /.content-header -->
  
      <!-- Main content -->
      <section class="content">
        <div class="container-fluid">
          <!-- Small boxes (Stat box) -->
          <div class="row">
            
          </div>
          <!-- /.row -->
          <!-- Main row -->
          <div class="row">
              <div class="col-12">
                  <!-- interactive chart -->
                  <div class="card card-primary card-outline">
                    <div class="card-header">
                      <h3 class="card-title">
                        <i class="far fa-clipboard"></i>
                         User Management
                      </h3>
      
                    </div>
                    <div class="card-body">
                  <button type="button" class="btn btn-primary" @click="register()" >Registrasi Akun</button>
                      <br/>
                      <table id="example2" class="table table-bordered table-hover">
                                      <thead>
                                      <tr>
                                        <th>Nama</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Status</th>
                                        <th>Aksi</th>
                                      </tr>
                                      </thead>
                                      <tbody>
                                        <tr v-for="(data,index) in data.data" :key="data.id">
                                        <td>{{data.nama}}</td>
                                        <td>{{data.email}}</td>
                                        <td v-if="data.id_role === 1">Admin</td>
                                        <td v-else-if="data.id_role === 2">Peneliti</td>
                                        <td v-else-if="data.id_role === 3">Operator</td>
                                        <td v-if="data.deleted_at === null">Aktif</td>
                                        <td v-else>Nonaktif</td>
                                        <td v-if="row[index] === 0"><button type="button" class="btn btn-block btn-danger btn-sm" @click="deleteUser(data.id, index)">Nonaktifkan Akun</button></td>
                                        <td v-else><button type="button" class="btn btn-block btn-success btn-sm" @click="restoreUser(data.id, index)">Aktifkan Akun</button></td>
                                        </tr>
                                      </tbody>
                        </table>
                                    <div class="text-center mt-5">
                                       <b-button v-if="hidefirst==false" variant="light" @click="first()"><i class="fas fa-angle-double-left"></i></b-button>
                                       <b-button v-if="hidefirst==false" class="mr-3" variant="light" @click="prev()"><i class="fas fa-angle-left"></i></b-button>
                                       <span>{{current_page}}</span>
                                       <b-button v-if="hidelast==false" class="ml-3" variant="light" @click="next()"><i class="fas fa-angle-right"></i></b-button>
                                       <b-button v-if="hidelast==false" variant="light" @click="last()"><i class="fas fa-angle-double-right"></i></b-button>
                                     </div>
                    </div>
                    <!-- /.card-body-->
                  </div>
                  <!-- /.card -->
      
                </div>
          </div>
          <!-- /.row (main row) -->
        </div><!-- /.container-fluid -->
      </section>
      <!-- /.content -->
    </div>
  </template>
  
  <script>
  import {getHeader, usersUrl} from '../../config'
  import axios from 'axios'
  export default {
  
      data: function () {
          return {
            data: [],
            hide_del: [],
            hide_res: [],
            row: [],
            current_page: '',
            last_page: '',
            hidefirst: true,
            hidelast: true
          }
      },
  
      methods: {
        next: function(){
          var app = this
          var nextUrl = app.data.next_page_url
          app.data = []
          axios.get(nextUrl, {headers: getHeader()})
              .then(function (response) {
              app.prod = response.data.data;
              //console.log(app.data.next_page_url)
              app.last_page = app.data.last_page
              app.current_page = app.data.current_page
              if(app.current_page == app.data.last_page){
                app.hidelast = true
              }
              else{
                app.hidefirst = false
              }
          })
          .catch(function (error) {
              console.log(error.message);
          });
        },
        last: function(){
          var app = this
          var lastUrl = app.data.last_page_url
          app.data = []
          axios.get(lastUrl, {headers: getHeader()})
              .then(function (response) {
              app.prod = response.data.data;
              //console.log(app.data.next_page_url)
              app.last_page = app.data.last_page
              app.current_page = app.data.current_page
              app.hidelast = true
              app.hidefirst = false
          })
          .catch(function (error) {
              console.log(error.message);
          });
        },
        prev: function(){
          var app = this
          var prevUrl = app.data.prev_page_url
          app.data = []
          axios.get(prevUrl, {headers: getHeader()})
              .then(function (response) {
              app.prod = response.data.data;
              //console.log(app.data.next_page_url)
              app.last_page = app.data.last_page
              app.current_page = app.data.current_page
              if(app.current_page == 1){
                app.hidefirst = true
              }
              else{
                app.hidelast = false
              }
          })
          .catch(function (error) {
              console.log(error.message);
          });
        },
        first: function(){
          var app = this
          var firstUrl = app.data.first_page_url
          app.data = []
          axios.get(firstUrl, {headers: getHeader()})
              .then(function (response) {
              app.prod = response.data.data;
              //console.log(app.data.next_page_url)
              app.last_page = app.data.last_page
              app.current_page = app.data.current_page
              app.hidefirst = true
              app.hidelast = false
          })
          .catch(function (error) {
              console.log(error.message);
          });
        },
  
        deleteUser: function(key,x){
          //window.console.log('id delete' + key)
          const delUrl = usersUrl + '/' + key;
          axios.delete(delUrl, {headers: getHeader()});
          this.makeToast('danger');
          this.row.splice(x,1,1);
          //this.getUsers();
        },
        restoreUser: function(key,x){
          //window.console.log('id delete' + key)
          const resUrl = usersUrl + '/' + key + '/restore';
          axios.put(resUrl, key, {headers: getHeader()});
          this.makeToast('success');
          this.row.splice(x,1,0)
        },
        register: function(){
          this.$router.push('/admin/register')
        },
        getUsers: function() {
  
          var app = this;
          app.row = [];
           axios.get(usersUrl, {headers: getHeader()})
              .then(function (response) {
              app.data = response.data.data;
              app.current_page = response.data.data.current_page
              app.last_page = response.data.data.last_page
              if(app.current_page != app.last_page){ 
                app.hidelast = false
                }
              for (let index = 0; index < app.data.data.length; index++) {
                if(app.data.data[index].deleted_at == null){
                  app.row.push(0)
                }
                else{
                  app.row.push(1)
                }
                
              }
              //console.log(app.data);
          })
          .catch(function (error) {
              console.log(error.message);
          });
  
        },
        makeToast: function(variant) {
          if(variant == 'success'){
            this.$bvToast.toast('Akun berhasil diaktifkan kembali', {
            title: 'Notifikasi',
            variant: variant,
            solid: true
          })
          } else{
            this.$bvToast.toast('Akun berhasil dinonaktifkan', {
            title: 'Notifikasi',
            variant: variant,
            solid: true
          })
          }
        }
  
      },
  
      created() {
        this.getUsers();
      }
  
      }
  </script>