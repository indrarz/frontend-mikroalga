<template>
  <!-- Content Wrapper. Contains page content -->
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
        <!-- Main row -->
        <div class="row">
           <div class="col-12">
             <!-- interactive chart -->
             <div class="card card-primary card-outline">
               <div class="card-header">
                 <h3 class="card-title">
                   <i class="fas fa-tachometer-alt"></i>
                   Dashboard
                 </h3>
               </div>
               <div class="card-body text-center">
                <div class="row">
                 <div class="col-lg-4 col-sm-4">
                   <div class="col-sm-12">
                   <!-- Chart -->
                    <div class="small-box">
                      <!-- Header -->
                      <div class="card-body">
                        <h5 class="font-weight-bold">Data Mikroalga</h5>
                        <br/>
                        <table id="example2" class="table table-bordered table-hover">
                          <thead>
                            <tr>
                              <th>Nama Spesies Mikroalga</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(mikroalga) in mikroalga.data" :key="mikroalga.id">
                              <td>{{mikroalga.nama_spesies}}</td>
                            </tr>
                          </tbody>
                        </table>
                        <!-- <pie-chart :data="graph_mikroalga"></pie-chart> -->
                        <br/>
                          <div class="col-sm-12">
                          <!-- Info -->
                              <h6 class="col-sm-12">Total</h6>
                              <h5 class="col-sm-12 font-weight-bold">{{jumlah_mikroalga}} Spesies</h5>
                          </div>
                      </div>
                    </div>
                   </div>
                 </div>

                 <div class="col-lg-4 col-sm-4">
                   <div class="col-sm-12">
                   <!-- Chart -->
                    <div class="small-box">
                      <!-- Header -->
                      <div class="card-body">
                        <h5 class="font-weight-bold">Data Kolam</h5>
                        <br/>
                        <table id="example2" class="table table-bordered table-hover">
                          <thead>
                            <tr>
                              <th>Nama Kolam</th>
                              <th>Volume Kolam (L)</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(kolam) in kolam.data" :key="kolam.id">
                              <td>{{kolam.nama_kolam}}</td>
                              <td>{{kolam.volume_kolam}}</td>
                            </tr>
                          </tbody>
                        </table>
                        <!-- <pie-chart :data="graph_kolam"></pie-chart> -->
                        <br/>
                          <div class="col-sm-12">
                          <!-- Info -->
                              <h6 class="col-sm-12">Total</h6>
                              <h5 class="col-sm-12 font-weight-bold">{{jumlah_kolam}} Kolam</h5>
                          </div>
                      </div>
                    </div>
                   </div>
                 </div>

                 <div class="col-lg-4 col-sm-4">
                   <div class="col-sm-12">
                   <!-- Chart -->
                    <dl class="row">
                      <div class="col-sm">
                      <!-- small box -->
                       <div class="small-box bg-danger">
                         <div class="inner">
                          <h6 class="col-sm">Jumlah User</h6>
                          <h3 class="col-sm">{{jumlah_user}}</h3>
                         </div>
                       </div>
                      </div>
                    </dl>
                    <dl class="row">
                      <div class="col-sm">
                      <!-- small box -->
                       <div class="small-box bg-info">
                         <div class="inner">
                           <h6 class="col-sm">Jumlah Peneliti</h6>
                           <h3 class="col-sm">{{jumlah_peneliti}}</h3>
                         </div>
                       </div>
                      </div>
                    </dl>
                    <dl class="row">
                      <div class="col-sm">
                      <!-- small box -->
                       <div class="small-box bg-success">
                         <div class="inner">
                           <h6 class="col-sm">Jumlah Operator</h6>
                           <h3 class="col-sm">{{jumlah_operator}}</h3>
                         </div>
                       </div>
                      </div>
                    </dl>
                   </div>
                 </div>
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
   </div>
 </template>
 
 <script>
 import {getHeader, kolamUrl, mikroalgaUrl, usersUrl} from '../../config'
 import axios from 'axios'
 
 export default {
   data: function () {
    return {
      kolam: [],
      user: [],
      mikroalga: [],
      graph_user:[],
      graph_mikroalga:[],
      graph_kolam:[],
      jumlah_user: '',
      jumlah_operator: '',
      jumlah_peneliti: '',
      jumlah_mikroalga: '',
      jumlah_kolam: '',
      isHidden: true,
      rt :null
    }
  },
 
  // mounted() {
  //   this.geolocate();
  // },
 
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
    // chart
    getUser: function(){
      var app = this;
      axios.get(usersUrl, {headers: getHeader()})
      .then(function(response){
        app.user=response.data.data;
        app.jumlah_user=app.user.data.length;
        //console.log(app.user)
        var temp = []
        temp = response.data.data;
        var x = 0; var y = 0;
        for (let i = 0; i < temp.data.length; i++) {
          if(temp.data[i].id_role == 2){
            x++
          }
          if(temp.data[i].id_role == 3){
            y++
          }
        }
        app.jumlah_peneliti=x;
        app.jumlah_operator=y;
      })
    },

    getMikroalga: function(){
      var app = this;
      app.row = [];
      axios.get(mikroalgaUrl, {headers: getHeader()})
      .then(function(response){
        app.mikroalga=response.data.data;
        app.jumlah_mikroalga=app.mikroalga.data.length;
        app.current_page = response.data.data.current_page
        app.last_page = response.data.data.last_page
        if(app.current_page != app.last_page){ 
          app.hidelast = false
        }
        //console.log(app.mikroalga)
        for (let index = 0; index < app.mikroalga.data.length; index++) {
          if(app.mikroalga.data[index].deleted_at == null){
            app.row.push(0)
          }
          else{
            app.row.push(1)
          }
        }
        // var temp = []
        // temp = response.data.data;
        // for (let i = 0; i < temp.data.length; i++) {
        //   var a = []; var x = 0;
        //   a.push(temp.data[i].nama_spesies)
        //   x++
        //   a.push(x)
        //   app.graph_mikroalga.push(a)
        // }
      })
      .catch(function (error) {
            console.log(error.message);
        });
    },

    getKolam: function(){
      var app = this;
      app.row = [];
      axios.get(kolamUrl, {headers: getHeader()})
      .then(function(response){
        app.kolam=response.data.data;
        app.jumlah_kolam=app.kolam.data.length;
        app.current_page = response.data.data.current_page
        app.last_page = response.data.data.last_page
        if(app.current_page != app.last_page){ 
          app.hidelast = false
        }
        for (let index = 0; index < app.kolam.data.length; index++) {
          if(app.kolam.data[index].deleted_at == null){
            app.row.push(0)
          }
          else{
            app.row.push(1)
          }
        }
        //console.log(app.kolam)
        var temp = []
        temp = response.data.data;
        for (let i = 0; i < temp.data.length; i++) {
          var a = []; var x = 0;
          a.push(temp.data[i].nama_kolam)
          x++
          a.push(x)
          app.graph_kolam.push(a)
        }
      })
    },
  },
 
  created() {
    this.getKolam();
    this.getMikroalga();
    this.getUser();
  }
 }
 </script>
 