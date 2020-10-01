<template>
      <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <div class="content-header">
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
                      <i class="fas fa-history"></i>
                      Log Aksi
                    </h3>
                  </div>
                  <div class="card-body">
                              <table id="example2" class="table table-bordered table-hover">
                                    <thead>
                                    <tr>
                                      <th>Nama</th>
                                      <!--<th>Jam</th>-->
                                      <th>Email</th>
                                      <th>Aksi</th>
                                      <th>Tanggal</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="data in data.data" :key="data.id">
                                      <td>{{data.user.nama}}</td>
                                      <!--<td>00.00.00</td>-->
                                      <td>{{data.user.email}}</td>
                                      <td v-if="data.id_aksi==1108">Mengunduh log sensor</td>
                                      <td v-else-if="data.id_aksi==1211">Menyalakan pompa air</td>
                                      <td v-else-if="data.id_aksi==1212">Mematikan pompa air</td>
                                      <td v-else-if="data.id_aksi==1221">Menyalakan pompa nutrisi</td>
                                      <td v-else-if="data.id_aksi==1222">Mematikan pompa nutrisi</td>
                                      <td v-else-if="data.id_aksi==1231">Menyalakan pompa pemanenan</td>
                                      <td v-else-if="data.id_aksi==1232">Mematikan pompa pemanenan</td>
                                      <td>{{data.created_at}}</td>
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
                  <div class="card-footer">
                    
                  </div>
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
import {getHeader, logaksiUrl} from '../../config'
import axios from 'axios'
import moment from 'moment'
export default {

    data: function () {
        return {
          data: [],
          kolam: [],
          prod: [],
          current_page: '',
          last_page: 0,
          hidefirst: true,
          hidelast: true
        }
    },

    methods: {
      next: function(){
        var app = this
        var logUrl = app.data.next_page_url
        app.data = []
        axios.get(logUrl, {headers: getHeader()})
            .then(function (response) {
            app.data = response.data.data;
            //console.log(app.data.next_page_url)
            app.last_page = app.data.last_page
            app.current_page = app.data.current_page
            if(app.current_page == app.data.last_page){
              app.hidelast = true
            }
            else{
              app.hidefirst = false
            }
            for (let i = 0; i < app.data.data.length; i++) {
              var temp = app.data.data[i].created_at
              app.data.data[i].created_at = moment(temp).format("DD MMMM YYYY, h:mm:ss a");
              temp = null
            }
        })
        .catch(function (error) {
            console.log(error.message);
        });
      },
      last: function(){
        var app = this
        var logUrl = app.data.last_page_url
        app.data = []
        axios.get(logUrl, {headers: getHeader()})
            .then(function (response) {
            app.data = response.data.data;
            console.log(app.data.next_page_url)
            app.last_page = app.data.last_page
            app.current_page = app.data.current_page
            app.hidelast = true
            app.hidefirst = false
            for (let i = 0; i < app.data.data.length; i++) {
              var temp = app.data.data[i].created_at
              app.data.data[i].created_at = moment(temp).format("DD MMMM YYYY, h:mm:ss a");
              temp = null
            }
        })
        .catch(function (error) {
            console.log(error.message);
        });
      },
      prev: function(){
        var app = this
        var logUrl = app.data.prev_page_url
        app.data = []
        axios.get(logUrl, {headers: getHeader()})
            .then(function (response) {
            app.data = response.data.data;
            console.log(app.data.next_page_url)
            app.last_page = app.data.last_page
            app.current_page = app.data.current_page
            if(app.current_page == 1){
              app.hidefirst = true
            }
            else{
              app.hidelast = false
            }
            for (let i = 0; i < app.data.data.length; i++) {
              var temp = app.data.data[i].created_at
              app.data.data[i].created_at = moment(temp).format("DD MMMM YYYY, h:mm:ss a");
              temp = null
            }
        })
        .catch(function (error) {
            console.log(error.message);
        });
      },
      first: function(){
        var app = this
        var logUrl = app.data.first_page_url
        app.data = []
        axios.get(logUrl, {headers: getHeader()})
            .then(function (response) {
            app.data = response.data.data;
            console.log(app.data.next_page_url)
            app.last_page = app.data.last_page
            app.current_page = app.data.current_page
            app.hidefirst = true
            app.hidelast = false
            for (let i = 0; i < app.data.data.length; i++) {
              var temp = app.data.data[i].created_at
              app.data.data[i].created_at = moment(temp).format("DD MMMM YYYY, h:mm:ss a");
              temp = null
            }
        })
        .catch(function (error) {
            console.log(error.message);
        });
      },


      getLog: function() {
        var app = this;
        app.data = []
        
         axios.get(logaksiUrl, {headers: getHeader()})
            .then(function (response) {
            app.data = response.data.data;
            app.current_page = app.data.current_page
            app.last_page = app.data.last_page
            if(app.current_page != app.last_page){ 
            app.hidelast = false
            }
            for (let i = 0; i < app.data.data.length; i++) {
              var temp = app.data.data[i].created_at
              app.data.data[i].created_at = moment(temp).format("DD MMMM YYYY, h:mm:ss a");
              temp = null
            }
        })
        .catch(function (error) {
            console.log(error.message);
        });


      }
    },

    created() {
      this.getLog();
      //this.getUsers();
    }

    }
</script>